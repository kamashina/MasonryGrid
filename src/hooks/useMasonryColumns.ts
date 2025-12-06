import { useMemo } from "react";

type IndexedItem<T> = {
  item: T;
  index: number;
};

type Column<T> = {
  items: IndexedItem<T>[];
  totalHeight: number;
};

const createInitialColumns = <T>(columnsCount: number): Column<T>[] =>
  Array.from({ length: columnsCount }, () => ({
    items: [],
    totalHeight: 0,
  }));

const getShortestColumnIndex = <T>(columns: Column<T>[]) =>
  columns.reduce(
    (minIdx, col, idx, arr) =>
      col.totalHeight < arr[minIdx].totalHeight ? idx : minIdx,
    0
  );

export const useMasonryColumns = <T>(
  data: IndexedItem<T>[],
  columnsCount: number,
  verticalGap: number,
  heights: Record<number, number>,
  defaultHeight = 150
): IndexedItem<T>[][] => {
  return useMemo(() => {
    const columns = data.reduce<Column<T>[]>((cols, item) => {
      const targetIndex = getShortestColumnIndex(cols);

      return cols.map((col, idx) =>
        idx === targetIndex
          ? {
              items: [...col.items, item],
              totalHeight: col.totalHeight + heights[item.index] + verticalGap,
            }
          : col
      );
    }, createInitialColumns<T>(columnsCount));

    return columns.map((col) => col.items);
  }, [data, columnsCount, verticalGap, heights, defaultHeight]);
};
