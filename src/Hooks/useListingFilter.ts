import { useCallback, useEffect, useState } from "react";

export interface UseListingFilterParams<F, D> {
  initialFilterState: F;
  data: Array<D>;
  onFilterLogic: (filterValues: F) => Array<D>;
  onFilterCallback?: () => void;
  onResetCallback?: () => void;
  onEnterScreenDependencies?: any;
}

/**
 *
 * @author andr30z
 **/
export function useListingFilter<F, D>({
  initialFilterState,
  onFilterLogic,
  data,
  onFilterCallback,
  onResetCallback,
  onEnterScreenDependencies,
}: UseListingFilterParams<F, D>) {
  const [filterFields, setFilterFields] = useState<F>(initialFilterState);
  const [filteredData, setFilteredData] = useState<Array<D>>(data);
  useEffect(
    function onEnterScreen() {
      onFilter();
    },
    [onEnterScreenDependencies]
  );

  const onFilter = useCallback(() => {
    setFilteredData(onFilterLogic(filterFields));
    if (onFilterCallback) onFilterCallback();
  }, [
    filterFields,
    onFilterCallback,
    onFilterLogic,
    onEnterScreenDependencies,
  ]);
  const onReset = useCallback(() => {
    setFilterFields(initialFilterState);
    setFilteredData(data);
    if (onResetCallback) onResetCallback();
  }, [initialFilterState, data, onResetCallback]);

  return {
    filterFields,
    setFilterFields,
    filteredData,
    setFilteredData,
    onFilter,
    onReset,
  };
}
