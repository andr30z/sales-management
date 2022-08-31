import { AntDesign, Entypo } from "@expo/vector-icons";
import { Button, ButtonGroup, Modal, ModalProps } from "@ui-kitten/components";
import { format } from "date-fns";
import React from "react";
import {
  InstallmentItem,
  reversedInstallementItemStatus,
  Sale,
} from "../../Context/SalesInfo/Reducer";
import { useSale } from "../../Hooks/useSale";
import { Container } from "../Container";
import { PerformaticList } from "../PerformaticList";
import { Text } from "../Text";
import { WithDirectFather } from "../WithDirectFather";
import { styles } from "./Styles";

interface InstallmentModalProps {
  sale: Sale;
}

/**
 *
 * @author andr30z
 **/
export const InstallmentModal = React.memo(
  WithDirectFather<ModalProps, InstallmentModalProps>(
    Modal as unknown as React.FC<ModalProps>,
    ({ sale }) => {
      const installmentData = sale?.installments ?? [];
      return (
        <Container center flex={1}>
          <PerformaticList<InstallmentItem>
            style={styles.installmentList}
            data={installmentData}
            emptyComponent={<></>}
          >
            {(_, { paymentDate, value, status: itemStatus }) => (
              <Container
                width="100%"
                borderRadius={60}
                height={50}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-evenly"
                paddingHorizontal={5}
              >
                <Text
                  numberOfLines={1}
                  status={paymentDate ? "primary" : "danger"}
                >
                  {paymentDate ? "Paga em:" : "Data de pagamento"}{" "}
                  {format(new Date(paymentDate), "MM/dd/yyyy HH:mm")}
                </Text>
                <Text numberOfLines={1} status="info">
                  {reversedInstallementItemStatus[itemStatus]}
                </Text>
                <Text numberOfLines={1} status="success">
                  {value}
                </Text>
                <Button
                  status="danger"
                  accessoryLeft={(props) => <Entypo {...props} name="trash" />}
                />
              </Container>
            )}
          </PerformaticList>
        </Container>
      );
    }
  )
);
