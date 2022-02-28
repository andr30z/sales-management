import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Text, useTheme } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Container } from "../../Components/Container";
import { SalesListingFilters } from "../../Components/SalesListingFilters";
import { SalesListingItem } from "../../Components/SalesListingItem";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import { Sales } from "../../Context/SalesInfo/Reducer";
import { getClient, useBoolean } from "../../Hooks";
import { FilterFields } from "../../Interfaces/FilterFields";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { filterByName, isDateInRange } from "../../Utils";
import { styles } from "./Styles";
const filterInitialState = {
  clientName: "",
  initialDate: "",
  finalDate: "",
  saleName: "",
};
/**
 *
 * @author andr30z
 **/
export const SalesListing: React.FC = () => {
  const {
    salesInfo: { sales, clients },
  } = useSalesInfoContext();
  const { value: isInLongPressMode, setTrue } = useBoolean();
  const navigation = useNavigation<StackNavigationProp<MainStackRoutesTypes>>();
  const theme = useTheme();
  const primaryTheme = theme["color-primary-default"];
  const [filterFields, setFilterFields] =
    useState<FilterFields>(filterInitialState);
  useEffect(() => {
    onFilter();
  }, [sales]);

  const [filteredSales, setFilteredSales] = useState(sales);
  const { clientName, finalDate, initialDate, saleName } = filterFields;
  const onFilter = () => {
    setFilteredSales(
      sales.filter(({ name, clientId, date }) => {
        let checkDate =
          finalDate && initialDate
            ? isDateInRange(initialDate, finalDate, date)
            : true;
        return (
          filterByName(name, saleName) &&
          filterByName(
            getClient(clients || [], clientId)?.name || "",
            clientName
          ) &&
          checkDate
        );
      })
    );
  };
  const onReset = () => {
    setFilterFields(filterInitialState);
    setFilteredSales(sales);
  };
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
        data={filteredSales}
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
            onFilter={onFilter}
            onReset={onReset}
          />
        }
      />
    </View>
  );
};
