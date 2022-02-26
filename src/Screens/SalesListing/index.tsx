import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { Container } from "../../Components/Container";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
export const SalesListing: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackRoutesTypes>>();
  return (
    <Container flexDirection="column">
      <Layout style={{ flex: 1 }}>
        <Container
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Text category={"h1"} status="primary">
            Vendas
          </Text>
          <Button
            style={{ borderRadius: 34 }}
            status="primary"
            size="small"
            onPress={() =>
              navigation.navigate(MAIN_STACK_ROUTES.SALES_FORM, {})
            }
            accessoryLeft={() => (
              <AntDesign name="plus" size={25} color="#fff" />
            )}
          />
        </Container>
      </Layout>
    </Container>
  );
};
