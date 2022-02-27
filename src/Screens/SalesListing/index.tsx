import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Card, Text, useTheme } from "@ui-kitten/components";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import React from "react";
import { FlatList, View } from "react-native";
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
  console.log(sales);
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme["color-primary-default"],
        flex: 1,
        flexDirection: "column",
      }}
    >
      <Container
        backgroundColor={theme["color-primary-default"]}
        minHeight={130}
        flex={null as any}
        width="100%"
        flexDirection="column"
      >
        <Container
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Text category={"h1"} status="control">
            Vendas
          </Text>
          <Button
            style={{ borderRadius: 34 }}
            appearance="outline"
            size="small"
            status="control"
            onPress={() =>
              navigation.navigate(MAIN_STACK_ROUTES.SALES_FORM, {})
            }
          >
            Adicionar
          </Button>
        </Container>
      </Container>
      <FlatList
        data={sales}
        style={styles.list}
        contentContainerStyle={styles.contentContainerStyle}
        indicatorStyle="black"
        renderItem={({ index, item: { name, date } }) => {
          const isEven = (index + 1) % 2 === 0;
          return (
            <Card
              appearance="outline"
              style={[
                styles.card,
                isEven && {
                  borderColor: theme["color-primary-default"],
                },
              ]}
            >
              <Container
                height="100%"
                width="100%"
                justifyContent="center"
                flexDirection="column"
              >
                <Text category="s1">{name}</Text>
                <Text category="s2">
                  {formatRelative(new Date(date), new Date(), {
                    locale: ptBR,
                  })}
                </Text>
              </Container>
            </Card>
          );
        }}
        ListHeaderComponent={<View style={{ marginTop: 30 }} />}
      />
    </View>
  );
};
