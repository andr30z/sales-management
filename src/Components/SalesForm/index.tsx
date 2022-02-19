import {
  Button,
  Calendar,
  Datepicker,
  Input,
  Layout,
  Text,
} from "@ui-kitten/components";
import { DateFnsService } from "@ui-kitten/date-fns";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import {
  ActionsTypes,
  Sales,
  SalesTypes,
} from "../../Context/SalesInfo/Reducer";
import { globalStyles } from "../../GlobalStyles";
import { Container } from "../Container";
import { KittenSelect } from "../KittenSelect";
import { styles } from "./Styles";

const validationSchema = Yup.object().shape({
  date: Yup.date().required("A data da venda é requerida."),
  name: Yup.string().required("O nome da venda é requerido."),
  types: Yup.array(Yup.mixed().oneOf(Object.values(SalesTypes))),
  description: Yup.string(),
  clientId: Yup.string().required(),
  value: Yup.number(),
  quantity: Yup.number().min(1),
});

const dateFnsService = new DateFnsService();
export const SalesForm: React.FC = () => {
  const { dispatcher } = useSalesInfoContext();
  return (
    <Formik<Sales>
      onSubmit={(values) => {
          console.log(dispatcher)
        dispatcher({ type: ActionsTypes.ADD_SALES, payload: values });
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
        values: { name, date, types, value, description, quantity },
        handleSubmit,
        handleChange,
        setFieldValue,
      }) => (
        <Container
          borderRadius={10}
          backgroundColor="#fff"
          width="100%"
          padding={15}
          justifyContent="center"
          flexDirection="column"
        >
          <Container center>
            <Text
              category="h2"
              status="primary"
              style={globalStyles.textCenter}
            >
              Cadastro de Vendas
            </Text>
          </Container>
          <Container flex={5}>
            <Input
              style={[globalStyles.input, styles.marginY]}
              value={name}
              placeholder="Nome da venda"
              onChangeText={handleChange("name")}
            />
            <Input
              style={[globalStyles.textArea, styles.marginY]}
              value={description}
              placeholder="Descrição"
              onChangeText={handleChange("name")}
            />
            <Container
              {...globalStyles.input}
              {...styles.marginY}
              flexDirection="row"
              alignItems="center"
              flex={null as any}
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
              selectStyle={[globalStyles.input, { marginVertical: 10 }]}
              value={types}
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
            <Datepicker
              style={[styles.calendar, styles.marginY]}
              dateService={dateFnsService as any}
              date={date}
              onSelect={handleChange("date")}
            />
            <Input
              style={[globalStyles.textArea, styles.marginY]}
              value={String(quantity)}
              keyboardType="number-pad"
              placeholder="Quantidade de itens vendidos"
              onChangeText={handleChange("quantity")}
            />
          </Container>
          <Button onPress={() => handleSubmit()}>Cadastrar</Button>
        </Container>
      )}
    </Formik>
  );
};
