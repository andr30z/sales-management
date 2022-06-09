import { useEffect, useState } from "react";
import { useBoolean } from "./useBoolean";
import { useListingFilter, UseListingFilterParams } from "./useListingFilter";
export interface UseListingScreenLogicParams<F, D extends { id: string }>
  extends UseListingFilterParams<F, D> {
  onDeleteAction: (items: Array<string>) => void;
}

export function useListingScreenLogic<F, D extends { id: string }>({
  initialFilterState,
  data,
  onFilterLogic,
  onDeleteAction,
}: UseListingScreenLogicParams<F, D>) {
  const {
    value: isInLongPressMode,
    setTrue: setIsInLongPressModeTrue,
    setFalse: setIsInLongPressModeFalse,
  } = useBoolean();
  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
  const clearSelected = () => {
    setSelectedItems([]);
  };
  const {
    filterFields,
    filteredData,
    onFilter,
    onReset,
    setFilterFields,
    setFilteredData,
  } = useListingFilter<F, D>({
    initialFilterState,
    data,
    onEnterScreenDependencies: data,
    onFilterLogic,
    onFilterCallback: clearSelected,
    onResetCallback: clearSelected,
  });

  useEffect(() => {
    if (!isInLongPressMode) clearSelected();
  }, [isInLongPressMode]);

  const onSelectAll = () => {
    setSelectedItems(filteredData.map(({ id }) => id));
  };

  const onDelete = () => {
    setIsInLongPressModeFalse();
    onDeleteAction(selectedItems);
  };

  return {
    setIsInLongPressModeTrue,
    setIsInLongPressModeFalse,
    onDelete,
    onReset,
    onSelectAll,
    isInLongPressMode,
    filterFields,
    setFilterFields,
    filteredData,
    setFilteredData,
    onFilter,
    clearSelected,
    selectedItems,
    setSelectedItems,
  };
}
