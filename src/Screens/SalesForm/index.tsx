import { Button, Datepicker, Input, Text } from "@ui-kitten/components";
import { DateFnsService } from "@ui-kitten/date-fns";
import { Formik } from "formik";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import * as Yup from "yup";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import {
  ActionsTypes,
  Sales,
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
> = ({ navigation }) => {
  const {
    dispatcher,
    salesInfo: { sales },
  } = useSalesInfoContext();
  console.log(sales);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        contentContainerStyle={styles.scrollContainer}
      >
        <Formik<Omit<Sales, "id" | "createdAt">>
          onSubmit={(values) => {
            dispatcher({ type: ActionsTypes.ADD_SALES, payload: values });
            navigation.goBack();
          }}
          validationSchema={validationSchema}
          initialValues={{
            date: "",
            name: "",
            types: [],
            description: "",
            clientId: "",
            value: "",
            quantity: 1,
          }}
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
                style={[globalStyles.input, styles.marginY]}
                value={name}
                placeholder="Nome da venda"
                onChangeText={handleChange("name")}
              />
              <Input
                style={[globalStyles.textArea, styles.marginY]}
                value={description}
                multiline
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
                <Text style={styles.inputValueText} category="h4" status="info">
                  R$
                </Text>
                <Input
                  style={{ flex: 5 }}
                  value={String(value)}
                  keyboardType="numeric"
                  placeholder="Valor da compra"
                  onChangeText={handleChange("value")}
                />
              </Container>
              <KittenSelect
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
                options={["Bijou", "Joia", "Outros"]}
              />
              <SelectClient
                value={clientId}
                marginY={styles.marginY.marginTop}
                onChange={handleChange("clientId")}
              />
              <Datepicker
                style={[styles.calendar, styles.marginY]}
                dateService={brazilianDateService as any}
                date={date}
                placeholder="Data da venda"
                onSelect={(value) => setFieldValue("date", value)}
              />
              <Input
                style={[globalStyles.textArea, styles.marginY]}
                value={String(quantity)}
                keyboardType="number-pad"
                placeholder="Quantidade de itens vendidos"
                onChangeText={handleChange("quantity")}
              />
              <Button style={styles.marginY} onPress={() => handleSubmit()}>
                Cadastrar
              </Button>
            </Container>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
