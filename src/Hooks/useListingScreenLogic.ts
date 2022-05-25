import { useEffect, useState } from "react";
import { useBoolean } from "./useBoolean";
export interface UseListingScreenLogicParams<F, D extends { id: string }> {
  initialFilterState: F;
  data: Array<D>;
  onFilterLogic: (filterValues: F) => Array<D>;
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
  const [filterFields, setFilterFields] = useState<F>(initialFilterState);
  const [filteredData, setFilteredData] = useState<Array<D>>(data);
  useEffect(() => {
    onFilter();
  }, [data]);
  useEffect(() => {
    if (!isInLongPressMode) clearSelected();
  }, [isInLongPressMode]);
  const clearSelected = () => {
    setSelectedItems([]);
  };

  const onFilter = () => {
    clearSelected();
    setFilteredData(onFilterLogic(filterFields));
  };
  const onReset = () => {
    clearSelected();
    setFilterFields(initialFilterState);
    setFilteredData(data);
  };

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
