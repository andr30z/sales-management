import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Container } from "../../Components/Container";
import { SalesListingFilters } from "../../Components/SalesListingFilters";
import { SalesListingItem } from "../../Components/SalesListingItem";
import { Text } from "../../Components/Text";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import { ActionsTypes, Sale } from "../../Context/SalesInfo/Reducer";
import { getClient, useBoolean } from "../../Hooks";
import { useCommonThemeColors } from "../../Hooks/useCommonThemeColors";
import { FilterFields } from "../../Interfaces/FilterFields";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { filterByName, isDateInRange } from "../../Utils";
import EmptyImage from "../../Illustrations/Empty-bro.svg";
import { styles } from "./Styles";
import { PerformaticList } from "../../Components/PerformaticList";
const filterInitialState = {
  clientName: "",
  initialDate: "",
  finalDate: "",
  saleName: "",
  saleStatus: "" as any,
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

  const { clientName, finalDate, initialDate, saleName, saleStatus } =
    filterFields;
  const onFilter = () => {
    clearSelected();
    setFilteredSales(
      sales.filter(({ name, clientId, date, status }) => {
        let checkDate =
          finalDate && initialDate
            ? isDateInRange(initialDate, finalDate, date)
            : true;
        console.log(saleStatus);
        const currentStatus =
          saleStatus === 0 || saleStatus === ("" as any)
            ? true
            : status === saleStatus - 1;
        return (
          filterByName(name, saleName) &&
          filterByName(
            getClient(clients || [], clientId)?.name || "",
            clientName
          ) &&
          checkDate &&
          currentStatus
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
          <Text fontFamily="heading" style={{ fontSize: 50 }} status="control">
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
            {(props) => (
              <Text {...props} style={undefined} category="h6" status="control">
                Adicionar
              </Text>
            )}
          </Button>
        </Container>
      </Container>
      <Container {...styles.listContainer}>
        {sales.length === 0 ? null : (
          <>
            {!isInLongPressMode && (
              <SalesListingFilters
                filterFields={filterFields}
                setFilterFields={setFilterFields}
                onFilter={onFilter}
                onReset={onReset}
              />
            )}
            {isInLongPressMode && (
              <Container
                flexDirection="row"
                justifyContent="space-around"
                width="100%"
                marginTop={30}
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
        )}
        <PerformaticList<Sale>
          data={filteredSales}
          style={styles.list}
          emptyComponent={
            <Container
              flexDirection="column"
              alignItems="center"
              flex={null as any}
            >
              <EmptyImage height="450" width="100%" />
              <Text
                fontFamily="subtitles"
                category="p1"
                status="primary"
                style={{ textAlign: "center" }}
              >
                Nenhuma venda cadastrada.
              </Text>
            </Container>
          }
        >
          {(_type, item, index) => (
            <SalesListingItem
              isInDeleteMode={isInLongPressMode}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              onLongPress={setTrue}
              index={index}
              item={item}
            />
          )}
        </PerformaticList>
      </Container>
    </View>
  );
};
