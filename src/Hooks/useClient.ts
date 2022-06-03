import { useMemo } from "react";
import { useSalesInfoContext } from "../Context/SalesInfo";
import { Client } from "../Context/SalesInfo/Reducer";
export const getClient = (clients: Array<Client>, clientId: string) =>
  clients.find((c) => c.id === clientId);
/**
 *
 * @author andr30z
 **/
export function useClient(clientId: string) {
  const { salesInfo } = useSalesInfoContext();
  const client = useMemo(
    () => getClient(salesInfo.clients, clientId),
    [salesInfo.clients, clientId]
  );
  const allSales = salesInfo.sales;
  const clientSales = useMemo(
    () => allSales.filter((sale) => sale.clientId === client?.id),
    [salesInfo.sales, client]
  );
  return { client, clientSales: allSales };
}
