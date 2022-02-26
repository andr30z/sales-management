import { useMemo } from "react";
import { useSalesInfoContext } from "../Context/SalesInfo";

/**
 *
 * @author andr30z
 **/
export function useClient(clientId: string) {
  const { salesInfo } = useSalesInfoContext();
  const client = useMemo(
    () => salesInfo.clients.find((c) => c.id === clientId),
    [salesInfo.clients, clientId]
  );
  return { client };
}
