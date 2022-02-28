import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Text, useTheme } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Container } from "../../Components/Container";
import { SalesListingFilters } from "../../Components/SalesListingFilters";
import { SalesListingItem } from "../../Components/SalesListingItem";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import { useBoolean } from "../../Hooks";
import { FilterFields } from "../../Interfaces/FilterFields";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { styles } from "./Styles";

/**
 *
 * @author andr30z
 **/
export const SalesListing: React.FC = () => {
  const {
    salesInfo: { sales },
  } = useSalesInfoContext();
  const { value: isInLongPressMode, setTrue } = useBoolean();
  const navigation = useNavigation<StackNavigationProp<MainStackRoutesTypes>>();
  const theme = useTheme();
  const primaryTheme = theme["color-primary-default"];
  const [filterFields, setFilterFields] = useState<FilterFields>({
    clientName: "",
    initialDate: "",
    finalDate: "",
  });

  return (
    <View
      style={{
        backgroundColor: primaryTheme,
        flex: 1,
        flexDirection: "column",
      }}
    >
      <StatusBar translucent backgroundColor={primaryTheme} />
      <Container
        backgroundColor={primaryTheme}
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
        renderItem={(props) => (
          <SalesListingItem onLongPress={setTrue} {...props} />
        )}
        ListHeaderComponent={
          <SalesListingFilters
            filterFields={filterFields}
            setFilterFields={setFilterFields}
          />
        }
      />
    </View>
  );
};
