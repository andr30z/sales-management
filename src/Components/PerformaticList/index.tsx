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
  useEmptyListComponent?: boolean;
  listDependencyProp?: any;
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
  useEmptyListComponent = true,
  listDependencyProp,
  ...props
}: PerfomaticListProps<D>) => {
  const { width } = useWindowDimensions();

  const listData = useMemo(() => new DataProvider((r1, r2) => r1 !== r2), []);

  const finalList = useMemo(
    () => listData.cloneWithRows(data),
    [data, listData, listDependencyProp]
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
  const layout = useMemo(
    () => getLayoutProvider(),
    [gridLayout, numColumns, widthOrHeight, itemWidth, itemHeight]
  );
  const layoutProvider = useRef(layout).current;
  return useEmptyListComponent && data.length === 0 ? (
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
      dataProvider={finalList}
      isHorizontal={isHorizontal}
      rowRenderer={children}
      {...props}
    />
  );
};
(RecyclerListView.propTypes as any)["externalScrollView"] = PropTypes.object;
