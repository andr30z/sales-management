import { StackScreenProps } from "@react-navigation/stack";
import { Button, Datepicker, Input } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";
import { Container } from "../../Components/Container";
import { FormErrorDisplayer } from "../../Components/FormErrorDisplayer";
import { KittenSelect } from "../../Components/KittenSelect";
import { SelectClient } from "../../Components/SelectClient";
import { Text } from "../../Components/Text";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import {
  ActionsTypes,
  Sale,
  SaleStatusType,
  SalesTypes,
} from "../../Context/SalesInfo/Reducer";
import { globalStyles } from "../../GlobalStyles";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { brazilianDateService, minDate } from "../../Utils";
import { styles } from "./Styles";

const validationSchema = Yup.object().shape({
  date: Yup.date().required("A data da venda é requerida."),
  name: Yup.string().required("O nome da venda é requerido."),
  types: Yup.array(
    Yup.mixed()
      .oneOf(Object.values(SalesTypes))
      .required("O tipo da venda é um campo requerido.")
  )
    .min(1, "Selecione pelo menos um tipo de venda.")
    .required("O tipo da venda é um campo requerido."),
  description: Yup.string(),
  clientId: Yup.string().required("O cliente é um campo requerido."),
  value: Yup.number()
    .typeError(
      "Verifique se o valor informado possui virgulas, somente pontos e numeros são aceitos."
    )
    .required("O valor da compra é requerido."),
  quantity: Yup.number()
    .min(1, "O número deve ser no mínimo 1.")
    .required("A quantidade é requerida."),
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
  const toast = useToast();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <StatusBar backgroundColor={"#fff"} />
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
            errors,
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
                  category="h1"
                  status="primary"
                  fontFamily="heading"
                  style={globalStyles.textCenter}
                >
                  Cadastro de Vendas
                </Text>
              </Container>
              <Input
                label="Nome da venda"
                style={[globalStyles.input, styles.marginY]}
                value={name}
                caption={<FormErrorDisplayer text={errors["name"]} />}
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
                  caption={<FormErrorDisplayer text={errors["value"]} />}
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
                error={errors["types"] as any}
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
                error={errors["status"]}
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
                error={errors["clientId"]}
              />
              <Datepicker
                caption={<FormErrorDisplayer text={errors["date"]} />}
                min={minDate}
                label="Data da venda"
                style={[styles.calendar, styles.marginY]}
                dateService={brazilianDateService}
                boundingMonth
                date={date ? new Date(date) : date}
                placeholder="Data da venda"
                onSelect={(value) => setFieldValue("date", value)}
              />
              <Input
                caption={<FormErrorDisplayer text={errors["quantity"]} />}
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
