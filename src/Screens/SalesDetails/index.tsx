import { Feather, FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { Text } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Linking, Pressable } from "react-native";
import { Container } from "../../Components/Container";
import {
  useBoolean,
  useClient,
  useCommonThemeColors,
  useFormatRelativeDate,
} from "../../Hooks";
import { useSale } from "../../Hooks/useSale";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { styles } from "./Styles";
import * as Clipboard from "expo-clipboard";
import { StatusBar } from "expo-status-bar";
import { SaleInfoListItem } from "../../Components/SaleInfoListItem";
import { useNavigation } from "@react-navigation/native";
import {
  ActionsTypes,
  reversedSalesStatus,
  reversedSalesTypes,
} from "../../Context/SalesInfo/Reducer";
import { ConfirmActionModal } from "../../Components/ConfirmActionModal";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import { useToast } from "react-native-toast-notifications";
import { format } from "date-fns";

export const SalesDetails: React.FC<
  StackScreenProps<MainStackRoutesTypes, MAIN_STACK_ROUTES.SALES_DETAILS>
> = ({
  route: {
    params: { saleId },
  },
}) => {
  const { sale } = useSale(saleId);
  const {
    setTrue,
    value: showConfirm,
    setValue: setShowConfirm,
  } = useBoolean();
  const { dispatcher } = useSalesInfoContext();
  const { client } = useClient(String(sale?.clientId));
  const navigation = useNavigation<StackNavigationProp<MainStackRoutesTypes>>();
  const { primaryColor, warningColor } = useCommonThemeColors();
  const saleCreatedAt = useFormatRelativeDate(sale?.createdAt);
  const toast = useToast();
  if (!sale || !client) return null;
  const { name, value, types, description, date, quantity, status } = sale;
  const copyToClipboard = () => {
    Clipboard.setString(client.phoneNumber);
  };
  const goBack = () => {
    navigation.goBack();
  };
  const clientNumber = client.phoneNumber;
  const onPressOpenWhatsapp = () => {
    Linking.canOpenURL("whatsapp://send").then((supported) => {
      return Linking.openURL(
        supported
          ? `whatsapp://send?phone=${clientNumber}`
          : `https://api.whatsapp.com/send?phone=${clientNumber}i`
      );
    });
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
      <ConfirmActionModal
        onActionConfirmed={onConfirmDelete}
        open={showConfirm}
        setOpen={setShowConfirm}
      />
      <StatusBar translucent backgroundColor={warningColor} />
      <Container
        flex={2}
        width="100%"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        position="relative"
        backgroundColor={warningColor}
      >
        <Container
          position="absolute"
          top={20}
          width="100%"
          flexDirection="row"
          paddingHorizontal={15}
          justifyContent="space-between"
        >
          <Pressable onPress={goBack}>
            <Ionicons name="chevron-back-circle" size={38} color="#fff" />
          </Pressable>
          <Entypo onPress={setTrue} name="trash" size={34} color="#fff" />
        </Container>
        <Container
          position="absolute"
          bottom={-35}
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Container
            width="80%"
            padding={15}
            backgroundColor="#fff"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            {...styles.header}
          >
            <Text
              numberOfLines={2}
              status="warning"
              ellipsizeMode="tail"
              style={{ textAlign: "center" }}
              category="h4"
            >
              {name}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{ textAlign: "left" }}
              category="c1"
              appearance="hint"
            >
              {format(new Date(date), "dd/MM/yyyy")}
            </Text>
          </Container>
        </Container>
      </Container>
      <LinearGradient
        colors={[warningColor, primaryColor]}
        style={styles.linearGradient}
        start={[0, 0]}
        end={[1, 0]}
      >
        <Container width="100%" flexDirection="column" flex={1}>
          <Text ellipsizeMode="tail" category="h5" status="control">
            Cliente: {client.name}
          </Text>
          <Pressable onPress={copyToClipboard}>
            <Text
              style={styles.linearGradientPhoneNumber}
              category="h6"
              status="control"
            >
              {clientNumber} <Feather name="copy" size={16} color="#fff" />
            </Text>
          </Pressable>
        </Container>
        <Pressable onPress={onPressOpenWhatsapp}>
          <FontAwesome name="whatsapp" size={40} color="#fff" />
        </Pressable>
      </LinearGradient>
      <Container
        paddingHorizontal={15}
        marginBottom={15}
        flexDirection="column"
        flex={5}
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
          <SaleInfoListItem label="Quantidade de produtos:" value={quantity} />
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
    </Container>
  );
};
