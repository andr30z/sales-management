import { StackScreenProps } from "@react-navigation/stack";
import { Button, Input, Text } from "@ui-kitten/components";
import { Formik } from "formik";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import * as Yup from "yup";
import { Container } from "../../Components/Container";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import {
  ActionsTypes,
  Client,
  SalesTypes,
} from "../../Context/SalesInfo/Reducer";
import { globalStyles } from "../../GlobalStyles";
import {
  ClientsFormProps,
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { styles } from "./Styles";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("O nome da venda é requerido."),
  phoneNumber: Yup.number().required("O número de telefone é obrigatório."),
  observation: Yup.string(),
});

/**
 *
 * @author andr30z
 **/
export const ClientsForm: React.FC<
  StackScreenProps<MainStackRoutesTypes, MAIN_STACK_ROUTES.CLIENTS_FORM>
> = ({
  navigation,
  route: {
    params: { routeOnSubmit },
  },
}) => {
  const { dispatcher } = useSalesInfoContext();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        contentContainerStyle={styles.scrollContainer}
      >
        <Formik<Omit<Client, "id" | "createdAt">>
          onSubmit={(values) => {
            console.log(values);
            console.log(routeOnSubmit, values);
            dispatcher({ type: ActionsTypes.ADD_CLIENT, payload: values });
            if (routeOnSubmit)
              navigation.navigate(routeOnSubmit as any, {
                selectCreatedClient: values,
              });
          }}
          validationSchema={validationSchema}
          initialValues={{
            name: "",
            observation: "",
            phoneNumber: "",
          }}
        >
          {({
            values: { name, observation, phoneNumber },
            handleSubmit,
            handleChange,
          }) => (
            <Container
              backgroundColor="#fff"
              width="100%"
              paddingHorizontal={15}
              justifyContent="center"
              flexDirection="column"
            >
              <Container center minHeight={100} flex={null as any}>
                <Text
                  category="h2"
                  status="primary"
                  style={globalStyles.textCenter}
                >
                  Cadastro de Clientes
                </Text>
              </Container>
              <Input
                style={[globalStyles.input, styles.marginY]}
                value={name}
                placeholder="Nome do cliente"
                onChangeText={handleChange("name")}
              />
              <Input
                style={[globalStyles.input, styles.marginY]}
                value={phoneNumber}
                placeholder="Telefone do cliente"
                onChangeText={handleChange("phoneNumber")}
              />
              <Input
                style={[globalStyles.textArea, styles.marginY]}
                value={observation}
                numberOfLines={4}
                multiline
                placeholder="Observação sobre o cliente. Ex: 'Fulano é Caloteiro.'"
                onChangeText={handleChange("observation")}
              />

              <Button onPress={() => handleSubmit()}>Cadastrar</Button>
            </Container>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
