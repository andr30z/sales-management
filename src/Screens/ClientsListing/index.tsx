import React from "react";
import { View } from "react-native";
import { Container } from "../../Components/Container";
import { ListActions } from "../../Components/ListActions";
import { ListingScreenHeader } from "../../Components/ListingScreenHeader";
import { ListingScreenItem } from "../../Components/ListingScreenItem";
import { PerformaticList } from "../../Components/PerformaticList";
import { Text } from "../../Components/Text";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import { ActionsTypes, Client } from "../../Context/SalesInfo/Reducer";
import { useCommonThemeColors, useListingScreenLogic } from "../../Hooks";
import { MAIN_STACK_ROUTES } from "../../Routes/MainStack/Types";
import { listingStyles as styles } from "../commonStyles";
import EmptyClient from "../../Illustrations/Empty-client.svg";
const initialFilterState = {
  name: "",
  phone: "",
};
export const ClientsListing: React.FC = () => {
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
    data: clients,
    initialFilterState,
    onDeleteAction: (data) => {
      dispatcher({
        payload: data,
        type: ActionsTypes.DELETE_CLIENT,
      });
    },
    onFilterLogic: (filterData) => clients,
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
        addEntityScreen={MAIN_STACK_ROUTES.CLIENTS_FORM}
        headerTitle="Clientes"
      />
      <Container {...styles.listContainer}>
        {clients.length === 0 ? null : (
          <>
            {/* {!isInLongPressMode && (
              <SalesListingFilters
                filterFields={filterFields}
                setFilterFields={setFilterFields}
                onFilter={onFilter}
                onReset={onReset}
              />
            )} */}
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
        <PerformaticList<Client>
          data={filteredData}
          style={styles.list}
          emptyComponent={
            <Container
              flexDirection="column"
              alignItems="center"
              flex={null as any}
            >
              <EmptyClient height="450" width="100%" />
              <Text
                fontFamily="subtitles"
                category="p1"
                status="primary"
                style={{ textAlign: "center" }}
              >
                Nenhum cliente cadastrado.
              </Text>
            </Container>
          }
        >
          {(_type, item, index) => (
            <ListingScreenItem
              isInDeleteMode={isInLongPressMode}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              dateKey="createdAt"
              detailsRoute={MAIN_STACK_ROUTES.SALES_DETAILS}
              name={item.name}
              onLongPress={setIsInLongPressModeTrue}
              index={index}
              item={item}
            >
              {({ item, resolveTextColor, styles }) => (
                <Text
                  status={resolveTextColor()}
                  numberOfLines={1}
                  style={styles.textItem}
                  category="c1"
                >
                  {item.phoneNumber}
                </Text>
              )}
            </ListingScreenItem>
          )}
        </PerformaticList>
      </Container>
    </View>
  );
};
