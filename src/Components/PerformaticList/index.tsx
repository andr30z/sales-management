import PropTypes from "prop-types";
import React, { useMemo, useRef } from "react";
import { ScrollViewProps, useWindowDimensions } from "react-native";
import {
  DataProvider,
  GridLayoutProvider,
  LayoutProvider,
  RecyclerListView,
  RecyclerListViewProps,
} from "recyclerlistview";
import { RecyclerListViewState } from "recyclerlistview/dist/reactnative/core/RecyclerListView";

export type RenderPerformaticItem<D = {}> = (
  type: string | number,
  data: D,
  index: number,
  extendedState?: object
) => JSX.Element | JSX.Element[] | null;

interface PerfomaticListProps<D = {}>
  extends Omit<
    RecyclerListViewProps,
    "layoutProvider" | "dataProvider" | "rowRenderer"
  > {
  itemWidth?: number;
  itemHeight?: number;
  data: Array<D>;
  style?: object | number;
  emptyComponent?: JSX.Element;
  children: RenderPerformaticItem<D>;
  isHorizontal?: boolean;
  externalScrollView?: any;
  widthOrHeight?: number;
  gridLayout?: boolean;
  scrollViewProps?: ScrollViewProps;
  numColumns?: number;
}
type RecyclerListViewPropsWithExternalScrollView = {
  externalScrollView: any;
} & Omit<RecyclerListViewProps, "externalScrollView">;
/**
 *
 * @author andr30z
 **/
export const PerformaticList = <D,>({
  itemWidth,
  itemHeight = 100,
  widthOrHeight = 100,
  gridLayout = false,
  data,
  children,
  style,
  emptyComponent = <></>,
  isHorizontal = false,
  externalScrollView,
  numColumns = 3,
  scrollViewProps,
  ...props
}: PerfomaticListProps<D>) => {
  const { width } = useWindowDimensions();

  const listData = useMemo(
    () => new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
    [data]
  );

  const getLayoutProvider = () => {
    if (gridLayout)
      return new GridLayoutProvider(
        numColumns,
        () => 0,
        () => 1,
        () => widthOrHeight
      );

    return new LayoutProvider(
      () => 0,
      (_type, dim) => {
        dim.width = itemWidth || width;
        dim.height = itemHeight;
      }
    );
  };
  const layoutProvider = useRef(getLayoutProvider()).current;
  return data.length === 0 ? (
    emptyComponent
  ) : (
    <RecyclerListView<
      RecyclerListViewPropsWithExternalScrollView,
      RecyclerListViewState
    >
      style={style}
      scrollViewProps={scrollViewProps}
      externalScrollView={externalScrollView}
      layoutProvider={layoutProvider}
      dataProvider={listData}
      isHorizontal={isHorizontal}
      rowRenderer={children}
      {...props}
    />
  );
};
(RecyclerListView.propTypes as any)["externalScrollView"] = PropTypes.object;
