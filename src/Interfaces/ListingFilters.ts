import { EvaStatus } from "@ui-kitten/components/devsupport";
import { Dispatch, SetStateAction } from "react";

export interface ListingFiltersProps<S> {
    onFilter: () => void;
    filterFields: S;
    setFilterFields: Dispatch<SetStateAction<S>>;
    onReset: () => void;
    mainColor?: EvaStatus;
    iconColors: string;
  }