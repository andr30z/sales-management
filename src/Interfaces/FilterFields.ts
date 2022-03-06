import { SaleStatusType } from "../Context/SalesInfo/Reducer";

export interface FilterFields {
  clientName: string;
  saleName: string;
  saleStatus: SaleStatusType;
  initialDate: string;
  finalDate: string;
}
