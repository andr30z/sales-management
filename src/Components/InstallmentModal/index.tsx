import { AntDesign, Entypo } from "@expo/vector-icons";
import { Button, ButtonGroup, Modal, ModalProps } from "@ui-kitten/components";
import { format, formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import React from "react";
import {
  Installment,
  InstallmentItem,
  reversedInstallementItemStatus,
  reversedInstallementStatus,
} from "../../Context/SalesInfo/Reducer";
import { useSale } from "../../Hooks/useSale";
import { formatToLocalCurrency } from "../../Utils";
import { Container } from "../Container";
import { PerformaticList } from "../PerformaticList";
import { Text } from "../Text";
import { WithDirectFather } from "../WithDirectFather";
import { styles } from "./Styles";

interface InstallmentModalProps {
  saleId?: string;
  installment: Installment;
}



/**
 *
 * @author andr30z
 **/
export const InstallmentModal = React.memo(
  WithDirectFather<ModalProps, InstallmentModalProps>(
    Modal as unknown as React.FC<ModalProps>,
    ({ installment, saleId }) => {
      const { sale } = useSale(saleId as string);
      const {
        items,
        status,
        value,
      } = sale?.installment || {};
      const installmentData = items ?? [];
      return (
        <Container center flex={1}>
          <Container
            width="100%"
            height={130}
            center
            flexDirection="row"
            justifyContent="space-evenly"
            flex={null}
          >
            <Text>R$: {value ? formatToLocalCurrency(value) : ""}</Text>
            {status ? <Text>{reversedInstallementStatus[status]}</Text> : null}
          </Container>
          <PerformaticList<InstallmentItem>
            style={styles.installmentList}
            data={installmentData}
          >
            {(_, { paymentDate, expectedPaymentDate, status: itemStatus }) => (
              <Container
                width="100%"
                borderRadius={60}
                height={50}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                paddingHorizontal={5}
              >
                <Container center flex={null}>
                  <Text
                    numberOfLines={1}
                    status={paymentDate ? "primary" : "danger"}
                  >
                    {paymentDate ? "Paga em:" : "Data de pagamento"}{" "}
                    {format(
                      new Date(paymentDate || expectedPaymentDate),
                      "MM/dd/yyyy" + (paymentDate ? " HH:mm" : "")
                    )}
                  </Text>
                  <Text numberOfLines={1} status="info">
                    {reversedInstallementItemStatus[itemStatus]}
                  </Text>
                </Container>
                <Container center flex={null}>
                  <ButtonGroup style={styles.buttonGroup}>
                    <Button
                      status="warning"
                      accessoryLeft={(props) => (
                        <AntDesign {...props} name="edit" />
                      )}
                    />
                    <Button
                      status="success"
                      accessoryLeft={(props) => (
                        <AntDesign {...props} name="checkcircle" />
                      )}
                    />
                    <Button
                      status="danger"
                      accessoryLeft={(props) => (
                        <Entypo {...props} name="trash" />
                      )}
                    />
                  </ButtonGroup>
                </Container>
              </Container>
            )}
          </PerformaticList>
        </Container>
      );
    }
  )
);
