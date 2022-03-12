import { StackScreenProps } from "@react-navigation/stack";
import { Button, Input } from "@ui-kitten/components";
import { Formik } from "formik";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import * as Yup from "yup";
import { Container } from "../../Components/Container";
import { FormErrorDisplayer } from "../../Components/FormErrorDisplayer";
import { Text } from "../../Components/Text";
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
  phoneNumber: Yup.string().test(
    "len",
    "O número de telefone deve ter mais de 12 dígitos.",
    (val) => (val ? val.length >= 13 : false)
  ),
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
            dispatcher({ type: ActionsTypes.ADD_CLIENT, payload: values });
            if (routeOnSubmit)
              navigation.navigate(routeOnSubmit as any, {
                selectCreatedClient: values,
              });
            else navigation.goBack();
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
            errors,
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
              <Container center minHeight={100} flex={null as any}>
                <Text
                  category="h2"
                  status="primary"
                  fontFamily="heading"
                  style={globalStyles.textCenter}
                >
                  Cadastro de Clientes
                </Text>
              </Container>
              <Input
                style={[globalStyles.input, styles.marginY]}
                value={name}
                caption={<FormErrorDisplayer text={errors["name"]} />}
                label="Nome do cliente"
                placeholder="Ex: Zezinho 123"
                onChangeText={handleChange("name")}
              />
              <Input
                label="Telefone"
                style={[globalStyles.input, styles.marginY]}
                value={phoneNumber}
                keyboardType="number-pad"
                placeholder="5561999999999"
                maxLength={14}
                caption={<FormErrorDisplayer text={errors["phoneNumber"]} />}
                onChangeText={(text) =>
                  setFieldValue(
                    "phoneNumber",
                    text.startsWith("55") ? text : "55" + text
                  )
                }
              />
              <Input
                label="Observação"
                style={[globalStyles.textArea, styles.marginY]}
                value={observation}
                numberOfLines={4}
                multiline
                caption={<FormErrorDisplayer text={errors["observation"]} />}
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
