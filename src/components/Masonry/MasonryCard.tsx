import React, { FC, memo } from "react";
import { StyleSheet, Text, View } from "react-native";

export type MasonryItem = {
  id: string;
  title: string;
  description?: string;
  color: string;
};

type Props = { item: MasonryItem };

const MasonryCard: FC<Props> = ({ item }) => {
  return (
    <View style={[styles.card, { backgroundColor: item.color }]}>
      <Text style={styles.title}>{item.title}</Text>
      {!!item.description && (
        <Text style={styles.description}>{item.description}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    justifyContent: "flex-start",
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
    color: "#111827",
  },
  description: {
    fontSize: 12,
    color: "#111827",
  },
});

export default memo(MasonryCard);
