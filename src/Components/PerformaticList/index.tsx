import React, { useMemo, useRef } from "react";
import { useWindowDimensions } from "react-native";
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from "recyclerlistview";

export type RenderPerformaticItem<D = {}> = (
  type: string | number,
  data: D,
  index: number,
  extendedState?: object
) => JSX.Element | JSX.Element[] | null;

interface PerfomaticListProps<D = {}> {
  itemWidth?: number;
  itemHeight?: number;
  data: Array<D>;
  style?: object | number;
  emptyComponent?: JSX.Element;
  children: RenderPerformaticItem<D>;
  isHorizontal?: boolean;
}

/**
 *
 * @author andr30z
 **/
export const PerformaticList = <D,>({
  itemWidth,
  itemHeight = 100,
  data,
  children,
  style,
  emptyComponent = <></>,
  isHorizontal = false,
}: PerfomaticListProps<D>) => {
  const { width } = useWindowDimensions();

  const listData = useMemo(
    () => new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
    [data]
  );
  const layoutProvider = useRef(
    new LayoutProvider(
      () => 0,
      (_type, dim) => {
        dim.width = itemWidth || width;
        dim.height = itemHeight;
      }
    )
  ).current;
  return data.length === 0 ? (
    emptyComponent
  ) : (
    <RecyclerListView
      style={style}
      layoutProvider={layoutProvider}
      dataProvider={listData}
      isHorizontal={isHorizontal}
      rowRenderer={children}
      
    />
  );
};
