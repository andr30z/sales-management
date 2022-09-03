import { MaterialIcons } from "@expo/vector-icons";
import { useBackHandler } from "@react-native-community/hooks";
import {
  Button,
  ButtonGroup,
  Datepicker,
  Input,
  Modal,
  ModalProps,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { Keyboard } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import {
  ActionsTypes,
  InstallmentItem as InstallmentItemInterface,
  Sale,
} from "../../Context/SalesInfo/Reducer";
import { globalStyles } from "../../GlobalStyles";
import { useCommonThemeColors } from "../../Hooks";
import { brazilianDateService, minDate } from "../../Utils";
import { Container } from "../Container";
import { InstallmentItem } from "../InstallmentItem";
import { PerformaticList } from "../PerformaticList";
import { Text } from "../Text";
import { ToggleContainer } from "../ToggleContainer";
import { WithDirectFather } from "../WithDirectFather";
import { styles } from "./Styles";

interface InstallmentModalProps {
  sale: Sale;
  closeModal: () => void;
}

/**
 *
 * @author andr30z
 **/
export const InstallmentModal = React.memo(
  WithDirectFather<ModalProps, InstallmentModalProps>(
    Modal as unknown as React.FC<ModalProps>,
    ({ sale, closeModal }) => {
      const { primaryColor } = useCommonThemeColors();
      const { dispatcher } = useSalesInfoContext();
      const installmentData = sale?.installments ?? [];
      const [installmentValue, setInstallmentValue] = useState("");
      const [installmentDate, setInstallmentDate] = useState("");
      useBackHandler(() => {
        closeModal();
        return true;
      });
      const resetInputs = () => {
        Keyboard.dismiss();
        setInstallmentDate("");
        setInstallmentValue("");
      };
      const toast = useToast();
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
              height: 200,
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
                    {isOpen ? (
                      <ButtonGroup
                        style={styles.buttonGroup}
                        status="primary"
                        appearance="outline"
                      >
                        <Button
                          onPress={() => {
                            if (installmentValue.trim().length === 0) {
                              toast.show("Infome um valor!", {
                                type: "danger",
                              });
                              return;
                            }
                            if (installmentValue.includes(",")) {
                              toast.show(
                                "Apenas pontos são permitidos no valor!",
                                {
                                  type: "danger",
                                }
                              );
                              return;
                            }
                            if (Number(installmentValue) < 0) {
                              toast.show("O valor não pode ser negativo!", {
                                type: "danger",
                              });
                              return;
                            }
                            if (!installmentDate) {
                              toast.show("Infome a data!", {
                                type: "danger",
                              });
                              return;
                            }
                            onToggle();
                            dispatcher({
                              type: ActionsTypes.ADD_SALES_PAYMENT,
                              payload: {
                                saleId: sale.id,
                                installment: {
                                  value: installmentValue,
                                  paymentDate: installmentDate,
                                },
                              },
                            });
                            resetInputs();
                            toast.show("Pagamento lançado com sucesso!", {
                              type: "success",
                            });
                          }}
                        >
                          Salvar
                        </Button>
                        <Button
                          onPress={() => {
                            onToggle();
                            resetInputs();
                          }}
                        >
                          Cancelar
                        </Button>
                      </ButtonGroup>
                    ) : (
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
                    )}
                  </Container>
                  <Container
                    {...globalStyles.input}
                    marginTop={20}
                    paddingHorizontal={15}
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Datepicker
                      min={minDate}
                      label="Data do pagamento"
                      style={styles.datePicker}
                      dateService={brazilianDateService}
                      onPress={() => Keyboard.dismiss()}
                      boundingMonth
                      date={
                        installmentDate
                          ? new Date(installmentDate)
                          : installmentDate
                      }
                      placeholder="Data da venda"
                      onSelect={(value) => setInstallmentDate(value.toString())}
                    />
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
            <PerformaticList<InstallmentItemInterface>
              style={styles.installmentList}
              data={installmentData}
              emptyComponent={
                <Container
                  flex={null}
                  height={100}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text status="primary" category="h5" center>
                    Nenhum pagamento para exibir.
                  </Text>
                </Container>
              }
            >
              {(_, item) => <InstallmentItem sale={sale} {...item} />}
            </PerformaticList>
          </Container>
        </Container>
      );
    }
  )
);
