import React, { PropsWithChildren, useReducer } from "react";
import {
  SalesInfoContext,
  SalesInfoContextInterface,
} from "../Context/SalesInfo";
import {
  Client,
  reducer,
  Sale,
  SalesManagementState,
  SaleStatusType,
  SalesTypes,
} from "../Context/SalesInfo/Reducer";

export const initialMockClient: Client = {
  createdAt: "2022-10-05T12:58:49.736Z",
  id: "1",
  name: "Test Client",
  observation: "",
  phoneNumber: "61952356723",
};

export const initialSecondClientMock: Client = {
  createdAt: "2022-10-05T12:58:49.736Z",
  id: "2",
  name: "Test Client 2",
  observation: "",
  phoneNumber: "619524444723",
};

export const initialMockSale: Sale = {
  clientId: initialMockClient.id,
  createdAt: "2022-10-05T12:58:49.736Z",
  date: "2022-10-05T12:58:49.736Z",
  description: "",
  id: "1",
  name: "Test Sale",
  quantity: 1,
  status: SaleStatusType.PAID,
  types: [SalesTypes.JEWELRY],
  value: "15",
};

export const clientWithNoSales: Client = {
  createdAt: "2022-10-05T12:58:49.736Z",
  id: "213aslkdxx234-29398123",
  name: "Test Client With No Sales",
  observation: "I have no sales",
  phoneNumber: "519327744799",
};
export const MockedSalesInfoContext: React.FC<
  PropsWithChildren<{
    reducerInitialState?: SalesManagementState;
    salesContextValue?: Partial<SalesInfoContextInterface>;
  }>
> = ({
  children,
  salesContextValue,
  reducerInitialState = {
    clients: [initialMockClient, initialSecondClientMock, clientWithNoSales],
    sales: [initialMockSale],
    hasSyncedContacts: true,
  },
}) => {
  const [state, dispatcher] = useReducer(reducer, reducerInitialState);
  return (
    <SalesInfoContext.Provider
      value={{
        dispatcher,
        async syncContacts(asyncStorageData) {},
        salesInfo: state,
        ...salesContextValue,
      }}
    >
      {children}
    </SalesInfoContext.Provider>
  );
};
