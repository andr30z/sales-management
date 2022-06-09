import { SaleStatusType } from "../Context/SalesInfo/Reducer";

export interface SalesFilterFields {
  clientName: string;
  saleName: string;
  saleStatus: SaleStatusType;
  initialDate: string;
  finalDate: string;
}
