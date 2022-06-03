import { Client, Sale } from "../../Context/SalesInfo/Reducer";

export type ClientsFormProps = {
  routeOnSubmit?: string;
  propsOnNavigateBack?: any;
};
export type SalesFormProps = {
  selectCreatedClient?: Client;
  formValues?: Sale;
};
export type MainStackRoutesTypes = {
  SalesForm: SalesFormProps;
  ClientsForm: ClientsFormProps;
  SalesDetails: { id: string };
  BottomNav: undefined;
  ClientDetails: { id: string };
};

export enum MAIN_STACK_ROUTES {
  SALES_FORM = "SalesForm",
  BOTTOM_NAV = "BottomNav",
  CLIENTS_FORM = "ClientsForm",
  SALES_DETAILS = "SalesDetails",
  CLIENT_DETAILS = "ClientDetails",
}
