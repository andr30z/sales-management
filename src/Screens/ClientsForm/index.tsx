import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { Button, Input } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";
import { Container } from "../../Components/Container";
import { FormErrorDisplayer } from "../../Components/FormErrorDisplayer";
import { Text } from "../../Components/Text";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import { ActionsTypes, Client } from "../../Context/SalesInfo/Reducer";
import { globalStyles } from "../../GlobalStyles";
import { useClient, useCommonThemeColors } from "../../Hooks";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { styles } from "./Styles";

export const CLIENT_FORM_CONTAINER_TEST_ID = "CONTAINER_TEST_ID";
export const CLIENT_FORM_SUBMIT_BTN = "SUBMIT_BTN_FORM";
export const CLIENT_FORM_NAME_INPUT = "NAME_INPUT_CLIENT";
export const CLIENT_FORM_PHONE_INPUT = "PHONE_INPUT_CLIENT";

export const CLIENT_FORM_PHONE_NUMBER_ERROR_MSG =
  "O número de telefone deve ter mais de 12 dígitos.";

export const CLIENT_FORM_NAME_REQUIRED_MESSAGE = "O nome da venda é requerido.";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(CLIENT_FORM_NAME_REQUIRED_MESSAGE),
  phoneNumber: Yup.string().test(
    "len",
    CLIENT_FORM_PHONE_NUMBER_ERROR_MSG,
    (val) => (val ? val.length >= 13 : false)
  ),
  observation: Yup.string(),
});

/**
 *
 * @author andr30z
 **/
export const ClientsFormNoMemo: React.FC<
  StackScreenProps<MainStackRoutesTypes, MAIN_STACK_ROUTES.CLIENTS_FORM>
> = ({
  route: {
    params: { routeOnSubmit, id },
  },
}) => {
  const navigation = useNavigation<StackNavigationProp<MainStackRoutesTypes>>();
  const { dispatcher } = useSalesInfoContext();
  const { primaryColor } = useCommonThemeColors();
  const { client } = useClient(id);

  const toast = useToast();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Formik<Omit<Client, "id" | "createdAt">>
          onSubmit={(values) => {
            dispatcher({
              type: client ? ActionsTypes.EDIT_CLIENT : ActionsTypes.ADD_CLIENT,
              payload: values,
            });
            toast.show("Cliente salvo com sucesso", {
              type: "success",
            });
            if (routeOnSubmit)
              navigation.navigate(routeOnSubmit as any, {
                selectCreatedClient: values,
              });
            else navigation.goBack();
          }}
          validationSchema={validationSchema}
          initialValues={
            client || {
              name: "",
              observation: "",
              phoneNumber: "",
            }
          }
        >
          {({
            values: { name, observation, phoneNumber },
            errors,
            handleSubmit,
            handleChange,
            setFieldValue,
          }) => (
            <Container
              testID={CLIENT_FORM_CONTAINER_TEST_ID}
              backgroundColor="#fff"
              width="100%"
              paddingHorizontal={15}
              justifyContent="center"
              flexDirection="column"
            >
              <StatusBar translucent backgroundColor={primaryColor} />
              <Container center minHeight={100} flex={null as any}>
                <Text
                  category="h2"
                  status="primary"
                  fontFamily="heading"
                  style={globalStyles.textCenter}
                >
                  Cadastro de Cliente {client ? ": " + client.name : ""}
                </Text>
              </Container>
              <Input
                style={[globalStyles.input, styles.marginY]}
                value={name}
                testID={CLIENT_FORM_NAME_INPUT}
                caption={<FormErrorDisplayer text={errors["name"]} />}
                label="Nome do cliente"
                placeholder="Ex: Zezinho 123"
                onChangeText={handleChange("name")}
              />
              <Input
                label="Telefone"
                testID={CLIENT_FORM_PHONE_INPUT}
                style={[globalStyles.input, styles.marginY]}
                value={phoneNumber}
                keyboardType="number-pad"
                placeholder="5561999999999"
                maxLength={14}
                caption={<FormErrorDisplayer text={errors["phoneNumber"]} />}
                onChangeText={(text) => {
                  setFieldValue(
                    "phoneNumber",
                    text.startsWith("55") ? text : "55" + text
                  );
                }}
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

              <Button
                testID={CLIENT_FORM_SUBMIT_BTN}
                onPress={() => handleSubmit()}
              >
                {client ? "Editar" : "Cadastrar"}
              </Button>
            </Container>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const ClientsForm = React.memo(ClientsFormNoMemo);
