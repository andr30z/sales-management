import { Button, Datepicker, Input, Text } from "@ui-kitten/components";
import { DateFnsService } from "@ui-kitten/date-fns";
import { Formik } from "formik";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import * as Yup from "yup";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import {
  ActionsTypes,
  Sale,
  SaleStatusType,
  SalesTypes,
} from "../../Context/SalesInfo/Reducer";
import { globalStyles } from "../../GlobalStyles";
import { Container } from "../../Components/Container";
import { KittenSelect } from "../../Components/KittenSelect";
import { styles } from "./Styles";
import { SelectClient } from "../../Components/SelectClient";
import { StackScreenProps } from "@react-navigation/stack";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { brazilianDateService } from "../../Utils";
import { StatusBar } from "expo-status-bar";
import { useCommonThemeColors } from "../../Hooks";
import { useToast } from "react-native-toast-notifications";

const validationSchema = Yup.object().shape({
  date: Yup.date().required("A data da venda é requerida."),
  name: Yup.string().required("O nome da venda é requerido."),
  types: Yup.array(Yup.mixed().oneOf(Object.values(SalesTypes))),
  description: Yup.string(),
  clientId: Yup.string().required(),
  value: Yup.number(),
  quantity: Yup.number().min(1),
});

/**
 *
 * @author andr30z
 **/
export const SalesForm: React.FC<
  StackScreenProps<MainStackRoutesTypes, MAIN_STACK_ROUTES.SALES_FORM>
> = ({
  navigation,
  route: {
    params: { formValues },
  },
}) => {
  const { dispatcher } = useSalesInfoContext();
  const { primaryColor } = useCommonThemeColors();
  const toast = useToast();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <StatusBar backgroundColor={primaryColor} />
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        contentContainerStyle={styles.scrollContainer}
      >
        <Formik<Omit<Sale, "id" | "createdAt">>
          onSubmit={(values) => {
            dispatcher({
              type: formValues?.id
                ? ActionsTypes.EDIT_SALE
                : ActionsTypes.ADD_SALES,
              payload: values,
            });
            toast.show("Registro salvo com sucesso", {
              type: "success",
            });
            navigation.goBack();
          }}
          validationSchema={validationSchema}
          initialValues={
            formValues || {
              date: "",
              name: "",
              types: [],
              description: "",
              clientId: "",
              value: "",
              quantity: 1 as any,
              status: SaleStatusType.UNPAID,
            }
          }
        >
          {({
            values: {
              name,
              date,
              types,
              value,
              description,
              quantity,
              clientId,
              status,
            },
            handleSubmit,
            handleChange,
            setFieldValue,
          }) => (
            <Container
              backgroundColor="#fff"
              width="100%"
              paddingHorizontal={15}
              justifyContent="center"
              flexDirection="column"
            >
              <Container center minHeight={100}>
                <Text
                  category="h2"
                  status="primary"
                  style={globalStyles.textCenter}
                >
                  Cadastro de Vendas
                </Text>
              </Container>
              <Input
                label="Nome da venda"
                style={[globalStyles.input, styles.marginY]}
                value={name}
                placeholder="Nome da venda"
                onChangeText={handleChange("name")}
              />
              <Input
                style={[globalStyles.textArea, styles.marginY]}
                value={description}
                multiline
                label="Descrição"
                numberOfLines={4}
                placeholder="Descrição"
                onChangeText={handleChange("description")}
              />
              <Container
                {...globalStyles.input}
                {...styles.marginY}
                flexDirection="row"
                alignItems="center"
              >
                <Input
                  label="Valor"
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
                  value={String(value)}
                  keyboardType="numeric"
                  placeholder="Valor da compra"
                  onChangeText={handleChange("value")}
                />
              </Container>
              <KittenSelect
                label="Tipo(s) de venda"
                value={types}
                selectStyle={[globalStyles.input, styles.marginY]}
                placeholder="Selecione o tipo de venda"
                multiSelect
                onChange={(index) => {
                  if (Array.isArray(index)) {
                    setFieldValue(
                      "types",
                      index.map((x) => x.row)
                    );
                  }
                }}
                options={["Bijou", "Joia", "Enxoval", "Outros"]}
              />
              <KittenSelect
                label="Status da venda"
                value={status}
                selectStyle={[globalStyles.input, styles.marginY]}
                placeholder="Selecione o status de venda"
                onChange={(index) => {
                  if (Array.isArray(index)) return;
                  setFieldValue("status", index.row);
                }}
                options={[
                  "Paga",
                  "Não paga",
                  "Em atraso",
                  "Cancelada",
                  "Reembolsada",
                ]}
              />
              <SelectClient
                value={clientId}
                marginY={styles.marginY.marginTop}
                onChange={handleChange("clientId")}
              />
              <Datepicker
                label="Data da venda"
                style={[styles.calendar, styles.marginY]}
                dateService={brazilianDateService as any}
                date={date ? new Date(date) : date}
                placeholder="Data da venda"
                onSelect={(value) => setFieldValue("date", value)}
              />
              <Input
                label="Quantidade de itens"
                style={[globalStyles.textArea, styles.marginY]}
                value={String(quantity)}
                keyboardType="number-pad"
                placeholder="Quantidade de itens vendidos"
                onChangeText={handleChange("quantity")}
              />
              <Button style={styles.marginY} onPress={() => handleSubmit()}>
                {formValues?.id ? "Salvar Edição" : "Cadastrar"}
              </Button>
            </Container>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
