import React from "react";
import { View } from "react-native";
import { Container } from "../../Components/Container";
import { ListActions } from "../../Components/ListActions";
import { ListingScreenHeader } from "../../Components/ListingScreenHeader";
import { PerformaticList } from "../../Components/PerformaticList";
import { SalesItem } from "../../Components/SalesItem";
import { SalesListingFilters } from "../../Components/SalesListingFilters";
import { Text } from "../../Components/Text";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import { ActionsTypes, Sale } from "../../Context/SalesInfo/Reducer";
import { getClient } from "../../Hooks";
import { useCommonThemeColors } from "../../Hooks/useCommonThemeColors";
import { useListingScreenLogic } from "../../Hooks/useListingScreenLogic";
import EmptyImage from "../../Illustrations/Empty-bro.svg";
import { MAIN_STACK_ROUTES } from "../../Routes/MainStack/Types";
import { filterByName, isDateInRange } from "../../Utils";
import { listingStyles as styles } from "../commonStyles";
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

  return (
    <View
      style={{
        backgroundColor: primaryTheme,
        flex: 1,
        flexDirection: "column",
      }}
    >
      <ListingScreenHeader
        addEntityScreen={MAIN_STACK_ROUTES.SALES_FORM}
        headerTitle="Vendas"
      />
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
            <ListActions
              show={isInLongPressMode}
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
            <SalesItem
              isInDeleteMode={isInLongPressMode}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              dateKey="date"
              detailsRoute={MAIN_STACK_ROUTES.SALES_DETAILS}
              name={item.name}
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
