import React from "react";
import { View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { ClientsListingFilter } from "../../Components/ClientsListingFilter";
import { Container } from "../../Components/Container";
import { ListActions } from "../../Components/ListActions";
import { ListingScreenHeader } from "../../Components/ListingScreenHeader";
import { ListingScreenItem } from "../../Components/ListingScreenItem";
import { PerformaticList } from "../../Components/PerformaticList";
import { Text } from "../../Components/Text";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import { ActionsTypes, Client } from "../../Context/SalesInfo/Reducer";
import { useCommonThemeColors, useListingScreenLogic } from "../../Hooks";
import EmptyClient from "../../Illustrations/Empty-client.svg";
import { MAIN_STACK_ROUTES } from "../../Routes/MainStack/Types";
import { filterByName } from "../../Utils";
import { listingStyles as styles } from "../commonStyles";
const initialFilterState = {
  name: "",
  phoneNumber: "",
  observation: "",
};
export const ClientsListing: React.FC = () => {
  const {
    salesInfo: { clients },
    dispatcher,
  } = useSalesInfoContext();
  const {
    primaryColor: primaryTheme,
    dangerColor,
    warningColor,
  } = useCommonThemeColors();
  const toast = useToast();
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
        payload: {
          clients: data.map((clientId) => ({
            id: clientId,
            name: clients.find((client) => client.id === clientId)?.name,
          })),
          onSuccess: () => {
            toast.show("Cliente(s) deletado(s) com sucesso.", {
              type: "success",
            });
          },
          onError: () => null,
        },
        type: ActionsTypes.DELETE_CLIENT,
      });
    },
    onFilterLogic: (filterData) =>
      clients.filter(
        ({ phoneNumber, name, observation }) =>
          filterByName(name, filterData.name) &&
          filterByName(phoneNumber, filterData.phoneNumber) &&
          filterByName(observation, filterData.observation)
      ),
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
            {!isInLongPressMode && (
              <ClientsListingFilter
                filterFields={filterFields}
                setFilterFields={setFilterFields}
                onFilter={onFilter}
                onReset={onReset}
                iconColors={primaryTheme}
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
        <PerformaticList<Client>
          data={filteredData}
          style={styles.list}
          scrollViewProps={{
            contentContainerStyle: {
              paddingVertical: 10,
            },
          }}
          extendedState={{}}
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
            <ListingScreenItem<Client>
              isInDeleteMode={isInLongPressMode}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              detailsRoute={MAIN_STACK_ROUTES.CLIENT_DETAILS}
              dateKey="createdAt"
              name={item.name}
              onLongPress={setIsInLongPressModeTrue}
              index={index}
              item={item}
            >
              {({ item, resolveTextColor, styles }) => (
                <Text
                  status={resolveTextColor()}
                  numberOfLines={2}
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
