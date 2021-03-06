import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Input, Text } from "@ui-kitten/components";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useCommonThemeColors } from "../../Hooks";
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
  propsOnNavigateBack?: any;
}>(
  ({
    clientName,
    setClientName,
    setFalse,
    navigation,
    propsOnNavigateBack,
  }) => {
    const { warningColor } = useCommonThemeColors();
    return (
      <Container
        flexDirection="column"
        justifyContent="center"
        height={150}
        borderTopRightRadius={15}
        borderTopLeftRadius={15}
        flex={null as any}
        backgroundColor={"#fff"}
        paddingHorizontal={15}
        paddingBottom={20}
      >
        <Container
          width="100%"
          flexDirection="row"
          padding={15}
          justifyContent="space-evenly"
          alignItems="center"
        >
          <AntDesign
            onPress={setFalse}
            name="closecircle"
            size={35}
            color={warningColor}
          />
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
                propsOnNavigateBack,
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
  }
);
