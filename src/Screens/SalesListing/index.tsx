import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { Container } from "../../Components/Container";
import { ListActions } from "../../Components/ListActions";
import { PerformaticList } from "../../Components/PerformaticList";
import { SalesListingFilters } from "../../Components/SalesListingFilters";
import { SalesListingItem } from "../../Components/SalesListingItem";
import { Text } from "../../Components/Text";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import { ActionsTypes, Sale } from "../../Context/SalesInfo/Reducer";
import { getClient } from "../../Hooks";
import { useCommonThemeColors } from "../../Hooks/useCommonThemeColors";
import { useListingScreenLogic } from "../../Hooks/useListingScreenLogic";
import EmptyImage from "../../Illustrations/Empty-bro.svg";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { filterByName, isDateInRange } from "../../Utils";
import { styles } from "./Styles";
const initialFilterState = {
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
  const {
    primaryColor: primaryTheme,
    dangerColor,
    warningColor,
  } = useCommonThemeColors();
  const {
    onDelete,
    onReset,
    onSelectAll,
    setIsInLongPressModeFalse,
    setIsInLongPressModeTrue,
    isInLongPressMode,
    filterFields,
    filteredData,
    setFilterFields,
    clearSelected,
    onFilter,
    selectedItems,
    setSelectedItems,
  } = useListingScreenLogic({
    data: sales,
    initialFilterState,
    onDeleteAction: (data) => {
      dispatcher({
        payload: data,
        type: ActionsTypes.DELETE_MANY_SALES,
      });
    },
    onFilterLogic: (filterData) =>
      sales.filter(({ name, clientId, date, status }) => {
        const { clientName, finalDate, initialDate, saleName, saleStatus } =
          filterData;
        let checkDate =
          finalDate && initialDate
            ? isDateInRange(initialDate, finalDate, date)
            : true;
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
      }),
  });
  const navigation = useNavigation<StackNavigationProp<MainStackRoutesTypes>>();

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
              <ListActions
                iconsColors={{
                  clearAll: warningColor,
                  selectAll: warningColor,
                  close: primaryTheme,
                  deleteItems: dangerColor,
                }}
                onClearAll={clearSelected}
                onClose={setIsInLongPressModeFalse}
                onDelete={onDelete}
                onSelectAll={onSelectAll}
              />
            )}
          </>
        )}
        <PerformaticList<Sale>
          data={filteredData}
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
              onLongPress={setIsInLongPressModeTrue}
              index={index}
              item={item}
            />
          )}
        </PerformaticList>
      </Container>
    </View>
  );
};
