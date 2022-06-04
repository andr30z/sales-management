import { Entypo } from "@expo/vector-icons";
import ReadMore from "@fawazahmed/react-native-read-more";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  Pressable,
  ScrollView,
  ScrollViewProps,
  useWindowDimensions,
} from "react-native";
import { useClientSalesListingContext } from "../../Context/ClientSalesListing";
import {
  useBoolean,
  useClient,
  useCommonThemeColors,
  useRouteParams,
} from "../../Hooks";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { Container } from "../Container";
import { ItemTitleDetailsHeader } from "../ItemTitleDetailsHeader";
import { SalesListingFilters } from "../SalesListingFilters";
import { Text } from "../Text";
import { WhatsappNumber } from "../WhatsappNumber";
import { styles } from "./Styles";
export const ClientScrollViewWrapper = React.forwardRef<
  ScrollView,
  ScrollViewProps
>(({ children, ...props }, ref) => {
  const { id } = useRouteParams<
    MainStackRoutesTypes,
    MAIN_STACK_ROUTES.CLIENT_DETAILS
  >();
  const clientId = id;
  const { warningColor } = useCommonThemeColors();
  const { client } = useClient(clientId);
  const navigation = useNavigation<StackNavigationProp<MainStackRoutesTypes>>();
  const openClient = () => {
    navigation.navigate(MAIN_STACK_ROUTES.CLIENTS_FORM, {
      id,
    });
  };
  const { width } = useWindowDimensions();
  const onConfirmDelete = () => {};
  const filter = useClientSalesListingContext();
  const { value: stickyHeader, setFalse, setTrue } = useBoolean();
  return (
    <>
      <ScrollView
        {...props}
        ref={ref}
        onScroll={(e) => {
          if (props.onScroll) props.onScroll(e);
          const {
            nativeEvent: { contentOffset },
          } = e;
          const isCloseToTop = contentOffset.y == 0;
          if (isCloseToTop) setFalse();
          else setTrue();
        }}
      >
        <ItemTitleDetailsHeader
          height={300}
          backgroundColor={warningColor}
          name={client?.name as string}
          date={client?.createdAt as string}
          onConfirmDelete={onConfirmDelete}
          stickyHeader={stickyHeader}
          headerMainContainerFirstChild={
            <Container
              position="absolute"
              top={-10}
              right={-10}
              height={40}
              width={40}
              borderRadius={20}
              backgroundColor="white"
              center
              flex={null}
              {...styles.editIconContainer}
            >
              <Pressable onPress={openClient}>
                <Entypo name="edit" size={19} color={warningColor} />
              </Pressable>
            </Container>
          }
        />
        <Text
          center
          style={{ marginTop: 65 }}
          fontFamily="other"
          status="primary"
          category="s2"
        >
          ID: {client?.id as string}
        </Text>
        <Container center width="100%" paddingHorizontal={10}>
          <ReadMore
            seeMoreText="Ver mais"
            seeLessText="Ver menos"
            numberOfLines={3}
            seeLessStyle={{ color: warningColor }}
            seeMoreStyle={{ color: warningColor }}
            style={{ alignSelf: "center", marginTop: 20 }}
            customTextComponent={(props: any) => (
              <Text
                {...props}
                category="p2"
                fontFamily="other"
                status="primary"
              />
            )}
          >
            Observação: {client?.observation as string} Observação:{" "}
            {client?.observation as string} Observação:{" "}
            {client?.observation as string} Observação:{" "}
            {client?.observation as string} Observação:{" "}
            {client?.observation as string} Observação:{" "}
            {client?.observation as string} Observação:{" "}
            {client?.observation as string} Observação:{" "}
            {client?.observation as string} Observação:{" "}
            {client?.observation as string}
          </ReadMore>
        </Container>
        <WhatsappNumber
          containerStyle={styles.whatsappContainer}
          phoneNumber={client?.phoneNumber as string}
        />
        <Container flex={null} height={50} center marginTop={25} width="100%">
          <Text status="warning" center category="h5" fontFamily="subtitles">
            Vendas para o cliente
          </Text>
        </Container>
        <Container
          maxHeight={300}
          width="100%"
          paddingHorizontal={15}
          justifyContent="center"
        >
          <SalesListingFilters
            mainColor="warning"
            iconColors={warningColor}
            useClientNameInput={false}
            {...(filter as any)}
          />
        </Container>
        {children}
      </ScrollView>
    </>
  );
});
