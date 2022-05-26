import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { format } from "date-fns";
import { Dispatch, SetStateAction, useMemo } from "react";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../Routes/MainStack/Types";
import { useCommonThemeColors } from "./useCommonThemeColors";

export interface ListingScreenItemParams<P> {
  selectedItems: Array<string>;
  setSelectedItems: Dispatch<SetStateAction<Array<string>>>;
  item: P;
  dateKey: string;
  detailsRoute: MAIN_STACK_ROUTES;
}

export function useListingScreenItem<I extends { id: string }>({
  selectedItems,
  setSelectedItems,
  item,
  detailsRoute,
  dateKey,
}: ListingScreenItemParams<I>) {
  const selectedPos = useMemo(
    () => selectedItems.findIndex((id) => id === item.id),
    [selectedItems]
  );
  const navigation = useNavigation<StackNavigationProp<MainStackRoutesTypes>>();
  const isSelected = selectedPos > -1;
  const { theme } = useCommonThemeColors();

  const onPressDeleteMode = () => {
    if (!isSelected) return setSelectedItems((past) => [...past, item.id]);
    setSelectedItems((past) => {
      const list = [...past];
      list.splice(selectedPos, 1);
      return list;
    });
  };

  const onPress = () => {
    navigation.navigate(detailsRoute, {
      saleId: item.id,
    });
  };

  const resolveTextColor = (optionalTextColor = "basic") =>
    isSelected ? "control" : optionalTextColor;

  const getDate = (item: any): string => item[dateKey];
  const dateItem = getDate(item);

  const date = useMemo(
    () => format(new Date(dateItem), "dd/MM/yyyy"),
    [dateItem]
  );

  return {
    resolveTextColor,
    date,
    selectedPos,
    isSelected,
    onPressDeleteMode,
    onPress,
    theme,
  };
}
