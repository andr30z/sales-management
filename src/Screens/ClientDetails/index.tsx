import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { useClient } from "../../Hooks";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";

/**
 *
 * @author andr30z
 **/
export const ClientDetails: React.FC<
  StackScreenProps<MainStackRoutesTypes, MAIN_STACK_ROUTES.CLIENT_DETAILS>
> = ({
  route: {
    params: { clientId },
  },
}) => {
  const { client } = useClient(clientId);

  if (!client) return null;
  return null;
};
