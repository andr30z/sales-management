import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ClientScrollViewWrapper } from "../../Components/ClientScrollViewWrapper";
import { Container } from "../../Components/Container";
import { PerformaticList } from "../../Components/PerformaticList";
import { Text } from "../../Components/Text";
import { Sale } from "../../Context/SalesInfo/Reducer";
import { useClient } from "../../Hooks";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { styles } from "./Styles";

/**
 *
 * @author andr30z
 **/
export const ClientDetails: React.FC<
  StackScreenProps<MainStackRoutesTypes, MAIN_STACK_ROUTES.CLIENT_DETAILS>
> = ({
  route: {
    params: { id },
  },
  navigation,
}) => {
  const { width } = useWindowDimensions();
  const { client, clientSales } = useClient(id);
  const goToSaleDetails = (id: string) => () => {
    navigation.navigate(MAIN_STACK_ROUTES.SALES_DETAILS, {
      id,
    });
  };
  if (!client) return null;
  return (
    <Container center flex={1} width={width}>
      <PerformaticList<Sale>
        data={clientSales as any}
        externalScrollView={ClientScrollViewWrapper}
        widthOrHeight={125}
        gridLayout
        numColumns={4}
        scrollViewProps={{
          bounces: false,
          style: styles.scrollView,
          contentContainerStyle: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        {(_, item) => (
          <Container
            flex={null}
            center
            width="100%"
            height="100%"
          >
            <Container
              {...styles.containerShadow}
              width="95%"
              height="80%"
              marginVertical={5}
              backgroundColor="white"
              borderRadius={14}
              center
              flex={1}
            >
              <TouchableOpacity
                style={styles.touchableSaleItem}
                containerStyle={styles.touchableContainerSaleItem}
                onPress={goToSaleDetails(item.id)}
              >
                <Text
                  status="warning"
                  category="label"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </Container>
          </Container>
        )}
      </PerformaticList>
    </Container>
  );
};
