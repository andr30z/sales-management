import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Input, Text } from "@ui-kitten/components";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { Container } from "../Container";
import { styles } from "./Styles";

export const SelectClientHeader = React.memo<{
  setFalse: () => void;
  clientName: string;
  setClientName: Dispatch<SetStateAction<string>>;
  navigation: StackNavigationProp<
    MainStackRoutesTypes,
    keyof MainStackRoutesTypes
  >;
}>(({ clientName, setClientName, setFalse, navigation }) => {
  useEffect(() => console.log("AAAA"), []);
  return (
    <Container
      flexDirection="column"
      justifyContent="center"
      marginBottom={15}
      paddingHorizontal={15}
    >
      <Container
        width="100%"
        flexDirection="row"
        padding={15}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Text category="h5" status="warning">
          Selecione o cliente
        </Text>
        <Button
          size="medium"
          status="warning"
          style={styles.btnAddPerson}
          onPress={() => {
            setFalse();
            navigation.navigate(MAIN_STACK_ROUTES.CLIENTS_FORM, {
              routeOnSubmit: MAIN_STACK_ROUTES.SALES_FORM,
            });
          }}
          accessoryLeft={() => (
            <Ionicons name="person-add-sharp" size={18} color="#fff" />
          )}
        />
      </Container>
      <Input
        style={{ backgroundColor: "#fff" }}
        placeholder="Pesquisar por nome"
        value={clientName}
        onChangeText={(text) => setClientName(text)}
        size="medium"
        status="warning"
      />
    </Container>
  );
});
