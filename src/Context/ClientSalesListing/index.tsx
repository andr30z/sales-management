import { StackScreenProps } from "@react-navigation/stack";
import React, { createContext, PropsWithChildren, useContext } from "react";
import { useClient, useListingFilter, useRouteParams } from "../../Hooks";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { filterSalesArrays, initialSalesFilterState } from "../../Utils";
import { Sale } from "../SalesInfo/Reducer";
interface ClientsDetailsContextInterface {
  filterFields: any;
  setFilterFields: React.Dispatch<any>;
  filteredData: Sale[];
  onFilter: () => void;
  onReset: () => void;
}

const ClientsDetailsContext = createContext<ClientsDetailsContextInterface>(
  {} as ClientsDetailsContextInterface
);

export const ClientSalesListingProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { id } = useRouteParams<
    MainStackRoutesTypes,
    MAIN_STACK_ROUTES.CLIENT_DETAILS
  >();
  const { clientSales } = useClient(id);
  const filter = useListingFilter({
    onEnterScreenDependencies: clientSales,
    data: clientSales,
    initialFilterState: initialSalesFilterState,
    onFilterLogic: (filterData) => filterSalesArrays(clientSales, filterData),
  });

  return (
    <ClientsDetailsContext.Provider value={filter}>
      {children}
    </ClientsDetailsContext.Provider>
  );
};

export function useClientSalesListingContext() {
  return useContext(ClientsDetailsContext);
}
