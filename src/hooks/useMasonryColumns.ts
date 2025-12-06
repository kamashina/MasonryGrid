import { useMemo } from "react";

type ColumnItem<T> = {
  item: T;
  index: number;
};

type Column<T> = {
  items: ColumnItem<T>[];
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
  data: T[],
  columnsCount: number,
  heights: Record<number, number>
): ColumnItem<T>[][] => {
  return useMemo(() => {
    const columns = data.reduce<Column<T>[]>((cols, item, index) => {
      const targetIndex = getShortestColumnIndex(cols);

      return cols.map((col, idx) =>
        idx === targetIndex
          ? {
              items: [...col.items, { item, index }],
              totalHeight: col.totalHeight + heights[index],
            }
          : col
      );
    }, createInitialColumns<T>(columnsCount));

    return columns.map((col) => col.items);
  }, [data, columnsCount, heights]);
};
