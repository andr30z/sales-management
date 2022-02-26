import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Button,
  Card,
  Layout,
  List,
  Text,
  useTheme,
} from "@ui-kitten/components";
import React from "react";
import { Container } from "../../Components/Container";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { styles } from "./Styles";
export const SalesListing: React.FC = () => {
  const {
    salesInfo: { sales },
  } = useSalesInfoContext();
  const navigation = useNavigation<StackNavigationProp<MainStackRoutesTypes>>();
  const theme = useTheme();
  return (
    <List
      data={sales}
      style={{ backgroundColor: "#fff" }}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.contentWrapper}
      indicatorStyle="black"
      numColumns={2}
      renderItem={({ index, item: { name,date } }) => {
        return (
          <Card
            status="primary"
            header={(props) => (
              <Container
                {...props}
                width="100%"
                flex={null as any}
                marginTop={-4}
                alignItems="center"
                backgroundColor={theme["color-primary-default"]}
              >
                <Text category="h6" status="control">
                  {name}
                </Text>
              </Container>
            )}
            style={[styles.card, index % 2 !== 0 && { marginTop: 25 }]}
          >
            <Text>
              {date}
            </Text>
          </Card>
        );
      }}
      ListHeaderComponent={
        <Container minHeight={130} flexDirection="column">
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
      }
    />
  );
};
