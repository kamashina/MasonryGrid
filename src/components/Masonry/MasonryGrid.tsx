import React, { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  LayoutChangeEvent,
} from "react-native";
import { useMasonryColumns } from "../../hooks/useMasonryColumns";

type Props<T> = {
  data: T[];
  columnsCount?: number;
  columnGap?: number;
  paddingHorizontal?: number;
  rowGap?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
};

const MasonryGrid = <T,>({
  data,
  columnGap = 8,
  renderItem,
  columnsCount = 3,
  paddingHorizontal = 16,
  rowGap = 8,
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

  const columns = useMasonryColumns(data, columnsCount, rowGap, heights);

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollContent, { paddingHorizontal }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.columnsContainer, { columnGap }]}>
        {columns.map((column, columnIndex) => (
          <View key={`column-${columnIndex}`} style={{ flex: 1, rowGap }}>
            {column.map(({ item, index }) => (
              <View
                key={index}
                style={{ width: columnWidth }}
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
  scrollContent: {
    paddingBottom: 24,
  },
  columnsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
});

export default MasonryGrid;
