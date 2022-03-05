import { Client, Sale } from "../../Context/SalesInfo/Reducer";

export type ClientsFormProps = { routeOnSubmit?: string };
export type SalesFormProps = { selectCreatedClient?: Client, formValues?: Sale };
export type MainStackRoutesTypes = {
  SalesForm: SalesFormProps;
  ClientsForm: ClientsFormProps;
  SalesDetails: { saleId: string };
  BottomNav: undefined;
};

export enum MAIN_STACK_ROUTES {
  SALES_FORM = "SalesForm",
  BOTTOM_NAV = "BottomNav",
  CLIENTS_FORM = "ClientsForm",
  SALES_DETAILS = "SalesDetails",
}
