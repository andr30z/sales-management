import { Entypo } from "@expo/vector-icons";
import { format } from "date-fns";
import React, { useMemo } from "react";
import { Pressable } from "react-native";
import NumberFormat from "react-number-format";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import {
  ActionsTypes,
  InstallmentItem as InstallmentItemInterface,
  Sale,
} from "../../Context/SalesInfo/Reducer";
import {
  useBoolean,
  useCommonThemeColors,
  useFormatRelativeDate,
} from "../../Hooks";
import { ConfirmActionModal } from "../ConfirmActionModal";
import { Container } from "../Container";
import { Text } from "../Text";
import { styles } from "./Styles";
interface InstallmentItemProps extends InstallmentItemInterface {
  sale: Sale;
}

export const InstallmentItem: React.FC<InstallmentItemProps> = ({
  id,
  paymentDate,
  value,
  sale,
}) => {
  const { dispatcher } = useSalesInfoContext();
  const { primaryColor } = useCommonThemeColors();
  const date = useMemo(
    () => format(new Date(paymentDate), "MM/dd/yyyy"),
    [paymentDate]
  );
  const {
    setValue: setShowConfirm,
    value: showConfirm,
    setTrue: openConfirm,
    setFalse: closeConfirm,
  } = useBoolean();
  const deleteInstallment = () => {
    dispatcher({
      type: ActionsTypes.DELETE_SALES_PAYMENT,
      payload: {
        saleId: sale.id,
        installmentId: id,
      },
    });
    closeConfirm();
    toast.show("Pagamento deletado com sucesso!", {
      type: "success",
    });
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={openConfirm}>
      <Container
        width="100%"
        justifyContent="center"
        alignItems="center"
        marginVertical={5}
        height={45}
        paddingHorizontal={5}
      >
        <ConfirmActionModal
          open={showConfirm}
          setOpen={setShowConfirm}
          confirmText={"Deseja realmente deletar o pagamento da venda?"}
          onActionConfirmed={deleteInstallment}
        />
        <Container
          borderRadius={60}
          borderWidth={0.2}
          flex={1}
          paddingHorizontal={15}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Container
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="baseline"
            flex={1}
          >
            <NumberFormat
              value={value}
              displayType={"text"}
              fixedDecimalScale
              decimalSeparator=","
              decimalScale={2}
              allowLeadingZeros
              allowEmptyFormatting
              isNumericString
              prefix={"R$ "}
              renderText={(formatedValue) => (
                <Text numberOfLines={1} status="primary">
                  {formatedValue}
                </Text>
              )}
            />
            <Text
              numberOfLines={1}
              fontFamily="other"
              category="c1"
              status="primary"
            >
              Pagamento realizado em {date}
            </Text>
          </Container>
          <Entypo size={23} color={primaryColor} name="trash" />
        </Container>
      </Container>
    </Pressable>
  );
};
