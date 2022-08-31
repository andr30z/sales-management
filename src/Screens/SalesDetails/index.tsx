import { Entypo, FontAwesome } from "@expo/vector-icons";
import { Portal } from "@gorhom/portal";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import { Container } from "../../Components/Container";
import { InstallmentModal } from "../../Components/InstallmentModal";
import { ItemTitleDetailsHeader } from "../../Components/ItemTitleDetailsHeader";
import { SaleInfoListItem } from "../../Components/SaleInfoListItem";
import { Text } from "../../Components/Text";
import { WhatsappNumber } from "../../Components/WhatsappNumber";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import {
  ActionsTypes,
  reversedSalesStatus,
  reversedSalesTypes,
} from "../../Context/SalesInfo/Reducer";
import {
  useBoolean,
  useClient,
  useCommonThemeColors,
  useFormatRelativeDate,
} from "../../Hooks";
import { useSale } from "../../Hooks/useSale";
import { PortalLocations } from "../../PortalLocations";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";

export const SalesDetails: React.FC<
  StackScreenProps<MainStackRoutesTypes, MAIN_STACK_ROUTES.SALES_DETAILS>
> = ({
  route: {
    params: { id },
  },
}) => {
  const { sale } = useSale(id);
  const { dispatcher } = useSalesInfoContext();
  const {
    setTrue: openInstallment,
    value: showInstallment,
    setFalse: closeInstallment,
  } = useBoolean();
  const { client } = useClient(String(sale?.clientId));
  const navigation = useNavigation<StackNavigationProp<MainStackRoutesTypes>>();
  const { warningColor } = useCommonThemeColors();
  const saleCreatedAt = useFormatRelativeDate(sale?.createdAt);
  const toast = useToast();
  if (!sale || !client) return null;
  const { name, value, types, description, date, quantity, status } = sale;
  const goBack = () => {
    navigation.goBack();
  };

  const onPressEdit = () => {
    navigation.navigate(MAIN_STACK_ROUTES.SALES_FORM, {
      formValues: { ...sale, date: new Date(date).toString() },
    });
  };
  const onConfirmDelete = () => {
    goBack();
    toast.show("Registro deletado com sucesso", {
      type: "success",
    });
    dispatcher({ type: ActionsTypes.DELETE_SALES, payload: sale.id });
  };
  //
  return (
    <Container flex={1} backgroundColor="#fff">
      <ScrollView contentContainerStyle={{ backgroundColor: "#fff" }}>
        <Portal hostName={PortalLocations.ROOT}>
          <InstallmentModal
            fatherProps={{
              style: {
                width: "95%",
                height: "75%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                borderRadius: 20,
              },
              backdropStyle: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              visible: showInstallment,
              onBackdropPress: closeInstallment,
            }}
            childProps={{
              sale,
            }}
          />
        </Portal>
        <ItemTitleDetailsHeader
          backgroundColor={warningColor}
          date={date}
          name={name}
          height={250}
          headerMiddleItem={
            <Pressable onPress={openInstallment}>
              <FontAwesome name="dollar" size={34} color="#fff" />
            </Pressable>
          }
          stickyHeader
          onConfirmDelete={onConfirmDelete}
        />
        <WhatsappNumber
          containerStyle={{ height: 110 }}
          phoneNumber={client.phoneNumber}
          title={`Cliente: ${client.name}`}
        />
        <Container
          paddingHorizontal={15}
          marginBottom={15}
          flexDirection="column"
          minHeight={400}
        >
          <Container
            justifyContent="space-between"
            flexDirection="row"
            alignItems="center"
            flex={null as any}
            height={30}
            paddingHorizontal={15}
            marginVertical={15}
          >
            <Text category="p1" status="warning">
              Informações
            </Text>
            <Pressable onPress={onPressEdit}>
              <Text category="p1" status="warning">
                Editar
                <Entypo name="edit" size={20} color={warningColor} />
              </Text>
            </Pressable>
          </Container>
          <Container
            paddingHorizontal={15}
            backgroundColor={"#fff"}
            borderRadius={10}
            shadowColor={"000"}
            shadowOffset={{
              width: 0,
              height: 3,
            }}
            shadowOpacity={0.29}
            shadowRadius={0.65}
            elevation={7}
            justifyContent="space-evenly"
          >
            <SaleInfoListItem label="ID:" value={sale.id} valueNumLines={3} />
            <SaleInfoListItem label="Valor (R$):" value={value} />
            <SaleInfoListItem
              label="Descrição:"
              value={description}
              valueNumLines={5}
              valueTextLimit="60%"
            />
            <SaleInfoListItem
              label="Quantidade de produtos:"
              value={quantity}
            />
            <SaleInfoListItem
              label="Status de pagamento:"
              value={reversedSalesStatus[status]}
            />
            <SaleInfoListItem
              label="Tipo(s) de venda:"
              value={types.map((x) => reversedSalesTypes[x]).join(", ")}
            />
            <SaleInfoListItem
              label="Registrado em:"
              value={saleCreatedAt}
              valueNumLines={2}
              showBorder={false}
            />
          </Container>
        </Container>
      </ScrollView>
    </Container>
  );
};
