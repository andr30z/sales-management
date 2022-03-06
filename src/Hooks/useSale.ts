import { useMemo } from "react";
import { useSalesInfoContext } from "../Context/SalesInfo";
import { Client, Sale } from "../Context/SalesInfo/Reducer";
export const getSale = (clients: Array<Sale>, clientId: string) =>
  clients.find((c) => c.id === clientId);
/**
 *
 * @author andr30z
 **/
export function useSale(saleId: string) {
  const { salesInfo } = useSalesInfoContext();
  const sale = useMemo(
    () => getSale(salesInfo.sales, saleId),
    [salesInfo.sales, saleId]
  );
  return { sale };
}
