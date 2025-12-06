import React, { useCallback, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MasonryGrid from "./src/components/Masonry/MasonryGrid";
import MasonryCard, { MasonryItem } from "./src/components/Masonry/MasonryCard";

const createInitialItems = (count: number) =>
  Array.from({ length: count }, (_, index) => createItem(index));

const COLORS = ["#bfdbfe", "#fecaca", "#bbf7d0", "#fde68a", "#e9d5ff"];

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const createItem = (index: number): MasonryItem => {
  const color = COLORS[index % COLORS.length];
  const descriptionLength = randomBetween(0, 10);

  const description =
    "Тестовое задание для React Native-разработчика Проект: UI-kit мобильного приложения Задача: Реализовать компонент Masonry Grid / Waterfall Layout"
      .split(" ")
      .slice(0, descriptionLength * 4)
      .join(" ");

  return {
    id: String(Date.now() + index),
    title: `Карточка #${index + 1}`,
    description,
    color,
  };
};

const App = () => {
  const [data, setData] = useState<MasonryItem[]>(() => createInitialItems(2));

  const handleAddCard = useCallback(() => {
    setData((prev) => [...prev, createItem(prev.length)]);
  }, []);

  const handleResetCards = useCallback(() => {
    setData(() => createInitialItems(2));
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />

      <SafeAreaView
        style={styles.container}
        edges={["top", "left", "right", "bottom"]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Masonry</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={handleAddCard}>
              <Text style={styles.buttonText}>Добавить карточку</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#f87171" }]}
              onPress={handleResetCards}
            >
              <Text style={styles.buttonText}>Сброс</Text>
            </TouchableOpacity>
          </View>
        </View>

        <MasonryGrid
          data={data}
          renderItem={(item) => <MasonryCard key={item.id} item={item} />}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#e5e7eb",
    fontSize: 20,
    fontWeight: "600",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#3b82f6",
  },
  buttonText: {
    color: "#f9fafb",
    fontSize: 14,
    fontWeight: "500",
  },
});
