import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { format } from "date-fns";
import React from "react";
import { useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ClientScrollViewWrapper } from "../../Components/ClientScrollViewWrapper";
import { Container } from "../../Components/Container";
import { PerformaticList } from "../../Components/PerformaticList";
import { Text } from "../../Components/Text";
import { WithDirectFather } from "../../Components/WithDirectFather";
import {
  ClientSalesListingProvider,
  useClientSalesListingContext,
} from "../../Context/ClientSalesListing";
import { reversedSalesStatus, Sale } from "../../Context/SalesInfo/Reducer";
import { useClient, useRouteParams } from "../../Hooks";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { styles } from "./Styles";

/**
 *
 * @author andr30z
 **/
export const ClientDetails = WithDirectFather(
  ClientSalesListingProvider,
  React.memo(() => {
    const { width } = useWindowDimensions();
    const { id } = useRouteParams<
      MainStackRoutesTypes,
      MAIN_STACK_ROUTES.CLIENT_DETAILS
    >();
    const navigation =
      useNavigation<StackNavigationProp<MainStackRoutesTypes>>();
    const { client } = useClient(id);
    const goToSaleDetails = (id: string) => () => {
      navigation.navigate(MAIN_STACK_ROUTES.SALES_DETAILS, {
        id,
      });
    };
    const { filteredData } = useClientSalesListingContext();
    if (!client) return null;

    const emptyFilter = [{ id: "empty-data" }] as Array<Sale>;
    const data = filteredData.length === 0 ? emptyFilter : filteredData;
    return (
      <Container center flex={1} width={width}>
        <PerformaticList<Sale>
          data={data}
          externalScrollView={ClientScrollViewWrapper}
          widthOrHeight={120}
          gridLayout
          useEmptyListComponent={false}
          numColumns={3}
          scrollViewProps={{
            style: styles.scrollView,
            contentContainerStyle: styles.scrollViewContentContainer,
          }}
        >
          {(_, item) =>
            item.id === "empty-data" ? (
              <></>
            ) : (
              <Container
                flex={null}
                center
                padding={7}
                width="100%"
                height="100%"
              >
                <Container
                  {...styles.containerShadow}
                  width="100%"
                  height="100%"
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
                      category="p2"
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      center
                      style={styles.saleName}
                    >
                      {item.name}
                    </Text>
                    <Text
                      status="warning"
                      category="s2"
                      fontFamily="other"
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      center
                    >
                      R$ {item.value}
                    </Text>
                    <Text
                      status="warning"
                      category="c2"
                      fontFamily="other"
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      center
                    >
                      {reversedSalesStatus[item.status]}
                    </Text>
                    <Text
                      status="warning"
                      category="c2"
                      fontFamily="other"
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      center
                    >
                      {format(new Date(item.date), "dd/MM/yyyy")}
                    </Text>
                  </TouchableOpacity>
                </Container>
              </Container>
            )
          }
        </PerformaticList>
      </Container>
    );
  })
);
