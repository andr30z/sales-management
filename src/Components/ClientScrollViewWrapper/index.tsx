import { RouteProp, useRoute } from "@react-navigation/native";
import { Button } from "@ui-kitten/components";
import React from "react";
import { ScrollView, ScrollViewProps, useWindowDimensions } from "react-native";
import { useBoolean, useClient, useCommonThemeColors } from "../../Hooks";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { Container } from "../Container";
import { ItemTitleDetailsHeader } from "../ItemTitleDetailsHeader";
import { Text } from "../Text";

export const ClientScrollViewWrapper = React.forwardRef<
  ScrollView,
  ScrollViewProps
>(({ children, ...props }, ref) => {
  const route =
    useRoute<
      RouteProp<MainStackRoutesTypes, MAIN_STACK_ROUTES.CLIENT_DETAILS>
    >();
  const clientId = route.params.id;
  const { warningColor } = useCommonThemeColors();
  const { client } = useClient(clientId);
  const onConfirmDelete = () => {};
  const { toggle, value } = useBoolean(true);
  return (
    <>
      <ScrollView ref={ref} {...props}>
        <ItemTitleDetailsHeader
          height={300}
          backgroundColor={warningColor}
          name={client?.name as string}
          date={client?.createdAt as string}
          onConfirmDelete={onConfirmDelete}
        />
        <Container  flex={null} height={50} center marginTop={55} width="100%">
          <Text center category="h5" fontFamily="subtitles">
            Vendas para o cliente
          </Text>
        </Container>
        <Button style={{ margin: 30 }} onPress={toggle}>
          RERENDER
        </Button>
        {value ? children : null}
      </ScrollView>
    </>
  );
});
