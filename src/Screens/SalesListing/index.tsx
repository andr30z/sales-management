import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Text } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Container } from "../../Components/Container";
import { SalesListingFilters } from "../../Components/SalesListingFilters";
import { SalesListingItem } from "../../Components/SalesListingItem";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import { ActionsTypes } from "../../Context/SalesInfo/Reducer";
import { getClient, useBoolean } from "../../Hooks";
import { useCommonThemeColors } from "../../Hooks/useCommonThemeColors";
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
    dispatcher,
  } = useSalesInfoContext();
  const { value: isInLongPressMode, setTrue, setFalse } = useBoolean();
  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
  const navigation = useNavigation<StackNavigationProp<MainStackRoutesTypes>>();
  const {
    primaryColor: primaryTheme,
    dangerColor,
    warningColor,
  } = useCommonThemeColors();
  const [filterFields, setFilterFields] =
    useState<FilterFields>(filterInitialState);
  const [filteredSales, setFilteredSales] = useState(sales);
  useEffect(() => {
    onFilter();
  }, [sales]);
  useEffect(() => {
    if (!isInLongPressMode) clearSelected();
  }, [isInLongPressMode]);
  const clearSelected = () => {
    setSelectedItems([]);
  };

  const { clientName, finalDate, initialDate, saleName } = filterFields;
  const onFilter = () => {
    clearSelected();
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
    clearSelected();
    setFilterFields(filterInitialState);
    setFilteredSales(sales);
  };

  const onSelectAll = () => {
    setSelectedItems(filteredSales.map(({ id }) => id));
  };

  const onDelete = () => {
    setFalse();
    dispatcher({
      payload: selectedItems,
      type: ActionsTypes.DELETE_MANY_SALES,
    });
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
          <SalesListingItem
            isInDeleteMode={isInLongPressMode}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            onLongPress={setTrue}
            {...props}
          />
        )}
        ListHeaderComponent={
          <>
            <SalesListingFilters
              filterFields={filterFields}
              setFilterFields={setFilterFields}
              onFilter={onFilter}
              onReset={onReset}
            />
            {isInLongPressMode && (
              <Container
                flexDirection="row"
                justifyContent="space-around"
                width="100%"
                marginTop={10}
              >
                <AntDesign
                  name="close"
                  size={30}
                  color={primaryTheme}
                  onPress={setFalse}
                />
                <AntDesign
                  onPress={onDelete}
                  name="delete"
                  size={30}
                  color={dangerColor}
                />
                <MaterialIcons
                  name="check-box"
                  size={32}
                  onPress={onSelectAll}
                  color={warningColor}
                />
                <MaterialIcons
                  name="check-box-outline-blank"
                  size={32}
                  onPress={clearSelected}
                  color={warningColor}
                />
              </Container>
            )}
          </>
        }
      />
    </View>
  );
};
