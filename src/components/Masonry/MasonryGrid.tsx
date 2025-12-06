import React, { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useMasonryColumns } from "../../hooks/useMasonryColumns";

type Props<T> = {
  data: T[];
  columnsCount?: number;
  columnGap?: number;
  paddingHorizontal?: number;
  rowGap?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  columnStyle?: StyleProp<ViewStyle>;
  itemWrapperStyle?: StyleProp<ViewStyle>;
};

const MasonryGrid = <T,>({
  data,
  columnGap = 8,
  renderItem,
  columnsCount = 3,
  paddingHorizontal = 16,
  style,
  contentContainerStyle,
  columnStyle,
  itemWrapperStyle,
}: Props<T>) => {
  const { width: screenWidth } = useWindowDimensions();
  const [heights, setHeights] = useState<Record<number, number>>({});

  const contentWidth = 390;
  const normalizedWidth = Math.min(screenWidth, contentWidth);

  const columnWidth =
    (normalizedWidth - paddingHorizontal * 2 - columnGap * (columnsCount - 1)) /
    columnsCount;

  const handleItemLayout = useCallback(
    (index: number, e: LayoutChangeEvent) => {
      const h = e.nativeEvent.layout.height;
      setHeights((prev) =>
        prev[index] === h ? prev : { ...prev, [index]: h }
      );
    },
    []
  );

  const columns = useMasonryColumns(data, columnsCount, heights);

  return (
    <ScrollView
      style={[styles.scroll, style]}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingHorizontal },
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.columnsContainer, { columnGap }]}>
        {columns.map((column, columnIndex) => (
          <View
            key={`column-${columnIndex}`}
            style={[styles.column, columnStyle]}
          >
            {column.map(({ item, index }) => (
              <View
                key={index}
                style={[
                  styles.itemWrapper,
                  { width: columnWidth },
                  itemWrapperStyle,
                ]}
                onLayout={(e) => handleItemLayout(index, e)}
              >
                {renderItem(item, index)}
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  columnsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    alignSelf: "stretch",
  },
  column: {
    flex: 1,
    gap: 8,
  },
  itemWrapper: {
    borderRadius: 16,
    overflow: "hidden",
  },
});

export default MasonryGrid;
