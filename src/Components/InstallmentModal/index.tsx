import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Button, Input, Modal, ModalProps } from "@ui-kitten/components";
import { format } from "date-fns";
import React, { useState } from "react";
import { Pressable } from "react-native";
import {
  InstallmentItem,
  reversedInstallementItemStatus,
  Sale,
} from "../../Context/SalesInfo/Reducer";
import { globalStyles } from "../../GlobalStyles";
import { useCommonThemeColors } from "../../Hooks";
import { Container } from "../Container";
import { PerformaticList } from "../PerformaticList";
import { Text } from "../Text";
import { ToggleContainer } from "../ToggleContainer";
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
      const { primaryColor } = useCommonThemeColors();
      const [installmentValue, setInstallmentValue] = useState("");
      return (
        <Container backgroundColor="#fff" center flex={1} width="100%">
          <Container
            flex={null}
            flexDirection="column"
            height="20%"
            width="100%"
            center
            backgroundColor={primaryColor}
          >
            <Text category="h1" fontFamily="heading" status="control">
              Pagamentos
            </Text>
          </Container>
          <ToggleContainer
            onOpenStyle={{
              backgroundColor: "white",
              height: 150,
              zIndex: 10000,
            }}
            onCloseStyle={{ height: 49 }}
            containerStyle={styles.toggleInputs}
          >
            {(_, onToggle, isOpen) => {
              return (
                <>
                  <Container
                    justifyContent="center"
                    alignItems="center"
                    flex={null as any}
                    maxHeight={50}
                  >
                    <Button
                      status="primary"
                      onPress={onToggle}
                      accessoryRight={
                        <MaterialIcons
                          name="attach-money"
                          color="#fff"
                          size={24}
                        />
                      }
                    >
                      {isOpen ? "Salvar Pagamento" : "Adicionar Pagamento"}
                    </Button>
                  </Container>
                  <Container
                    {...globalStyles.input}
                    marginTop={20}
                    paddingHorizontal={15}
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Input
                      label="Valor do Lançamento"
                      accessoryLeft={() => (
                        <Text
                          style={styles.inputValueText}
                          category="s1"
                          status="info"
                        >
                          R$
                        </Text>
                      )}
                      style={{ flex: 5 }}
                      value={installmentValue}
                      keyboardType="numeric"
                      placeholder="Valor da compra"
                      onChangeText={setInstallmentValue}
                    />
                  </Container>
                </>
              );
            }}
          </ToggleContainer>
          <Container width="100%" backgroundColor="#fff" flex={1} center>
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
                    accessoryLeft={(props) => (
                      <Entypo {...props} name="trash" />
                    )}
                  />
                </Container>
              )}
            </PerformaticList>
          </Container>
        </Container>
      );
    }
  )
);
