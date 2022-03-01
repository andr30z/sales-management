import { Client } from "../../Context/SalesInfo/Reducer";

export type ClientsFormProps = { routeOnSubmit?: string };
export type SalesFormProps = { selectCreatedClient?: Client };
export type MainStackRoutesTypes = {
  SalesForm: SalesFormProps;
  ClientsForm: ClientsFormProps;
  BottomNav: undefined;
};

export enum MAIN_STACK_ROUTES {
  SALES_FORM = "SalesForm",
  BOTTOM_NAV = "BottomNav",
  CLIENTS_FORM = "ClientsForm",
}
