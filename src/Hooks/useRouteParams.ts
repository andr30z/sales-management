import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native";
type Keyof<T extends {}> = Extract<keyof T, string>;

/**
 *
 * @author andr30z
 **/
export function useRouteParams<
  PL extends ParamListBase,
  RN extends keyof PL = Keyof<PL>
>() {
  const { params } = useRoute<RouteProp<PL, RN>>();

  return { ...params } as Readonly<PL[RN]>;
}
