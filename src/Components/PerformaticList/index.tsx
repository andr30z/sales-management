import React, { useMemo, useRef } from "react";
import { useWindowDimensions } from "react-native";
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from "recyclerlistview";

interface PerfomaticListProps<D = any> {
  itemWidth?: number;
  itemHeight?: number;
  data: Array<D>;
  style?: object | number;
  children: (
    type: string | number,
    data: any,
    index: number,
    extendedState?: object
  ) => JSX.Element | JSX.Element[] | null;
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
  return (
    <RecyclerListView
      style={style}
      layoutProvider={layoutProvider}
      dataProvider={listData}
      rowRenderer={children}
    />
  );
};
