import { renderHook, waitFor } from "@testing-library/react-native";
import { useReducer } from "react";
import { asyncStorageSetItemMockFn } from "../../../../__mocks__/@react-native-async-storage/async-storage";
import {
    clientWithNoSales,
    initialMockClient,
    initialMockSale, mockedSalesInfoContextInitialState,
    saleWithInstallment,
    secondMockSale
} from "../../../TestCommons";
import {
    ActionsTypes,
    INITIAL_STATE,
    InstallmentItem,
    reducer
} from "../Reducer";

describe("SalesInfo Reducer hook", () => {
  const useSalesReducer = (initialState = INITIAL_STATE) => {
    return renderHook(() => useReducer(reducer, initialState));
  };
  it("should replace the reducer current state", async () => {
    const { result } = useSalesReducer();
    const dispatch = result.current[1];
    await waitFor(() =>
      dispatch({
        type: ActionsTypes.SET_CURRENT_STATE_WITH_STORAGE,
        payload: mockedSalesInfoContextInitialState,
      })
    );
    // using result to get fresh results
    const state = result.current[0];
    expect(state).toBe(mockedSalesInfoContextInitialState);
  });

  it("should save imported data to AsyncStorage and reducer state", async () => {
    const { result } = useSalesReducer();
    const dispatch = result.current[1];
    await waitFor(() =>
      dispatch({
        type: ActionsTypes.IMPORT_DATA,
        payload: mockedSalesInfoContextInitialState,
      })
    );
    const state = result.current[0];
    expect(asyncStorageSetItemMockFn).toBeCalledWith(
      JSON.stringify(mockedSalesInfoContextInitialState)
    );
    expect(state).toBe(mockedSalesInfoContextInitialState);
  });

  it("should fail when trying to delete client with bonded sales", async () => {
    const { result } = useSalesReducer(mockedSalesInfoContextInitialState);
    const dispatch = result.current[1];
    const onError = jest.fn();
    const onSuccess = jest.fn();
    await waitFor(() =>
      dispatch({
        type: ActionsTypes.DELETE_CLIENT,
        payload: {
          onError,
          onSuccess,
          clients: [{ id: initialMockClient.id, name: initialMockClient.name }],
        },
      })
    );
    const state = result.current[0];
    expect(onError).toBeCalled();
    expect(onSuccess).not.toBeCalled();
    //this ensures that the reducer state has not been modified
    expect(state).toBe(mockedSalesInfoContextInitialState);
  });

  it("should delete a client", async () => {
    const { result } = useSalesReducer(mockedSalesInfoContextInitialState);
    const dispatch = result.current[1];
    const onError = jest.fn();
    const onSuccess = jest.fn();
    await waitFor(() =>
      dispatch({
        type: ActionsTypes.DELETE_CLIENT,
        payload: {
          onError,
          onSuccess,
          clients: [{ id: clientWithNoSales.id, name: clientWithNoSales.name }],
        },
      })
    );
    const state = result.current[0];
    expect(onSuccess).toBeCalled();
    expect(onError).not.toBeCalled();
    expect(asyncStorageSetItemMockFn).toBeCalled();
    expect(state.clients).not.toContain(clientWithNoSales);
  });

  it("should delete a sale", async () => {
    const { result } = useSalesReducer(mockedSalesInfoContextInitialState);
    const dispatch = result.current[1];
    await waitFor(() =>
      dispatch({
        type: ActionsTypes.DELETE_SALES,
        payload: initialMockSale.id,
      })
    );
    const state = result.current[0];
    expect(asyncStorageSetItemMockFn).toBeCalled();
    expect(state.sales).not.toContain(initialMockSale);
  });

  it("should delete many sales", async () => {
    const { result } = useSalesReducer(mockedSalesInfoContextInitialState);
    const dispatch = result.current[1];
    await waitFor(() =>
      dispatch({
        type: ActionsTypes.DELETE_MANY_SALES,
        payload: [initialMockSale.id, secondMockSale.id],
      })
    );
    const state = result.current[0];
    expect(asyncStorageSetItemMockFn).toBeCalled();
    expect(state.sales).not.toContain(initialMockSale);
    expect(state.sales).not.toContain(secondMockSale);
  });

  it("should add client to state", async () => {
    const { result } = useSalesReducer();
    const dispatch = result.current[1];
    await waitFor(() =>
      dispatch({
        type: ActionsTypes.ADD_CLIENT,
        payload: initialMockClient,
      })
    );
    const state = result.current[0];
    expect(asyncStorageSetItemMockFn).toBeCalled();
    expect(state.clients).toHaveProperty("[0].name", initialMockClient.name);
    expect(state.clients).toHaveProperty(
      "[0].phoneNumber",
      initialMockClient.phoneNumber
    );
  });

  it("should add sale to state", async () => {
    const { result } = useSalesReducer();
    const dispatch = result.current[1];
    await waitFor(() =>
      dispatch({
        type: ActionsTypes.ADD_SALES,
        payload: initialMockSale,
      })
    );
    const state = result.current[0];

    expect(asyncStorageSetItemMockFn).toBeCalled();
    expect(state.sales).toHaveProperty("[0].name", initialMockSale.name);
    expect(state.sales).toHaveProperty("[0].date", initialMockSale.date);
    expect(state.sales).toHaveProperty(
      "[0].clientId",
      initialMockSale.clientId
    );
  });

  it("should edit client", async () => {
    const { result } = useSalesReducer(mockedSalesInfoContextInitialState);
    const dispatch = result.current[1];
    const NAME = "TEST_EDIT";
    const payload = { ...initialMockClient, name: NAME };
    await waitFor(() =>
      dispatch({
        type: ActionsTypes.EDIT_CLIENT,
        payload: payload,
      })
    );
    const state = result.current[0];

    expect(asyncStorageSetItemMockFn).toBeCalled();
    const client = state.clients.find(({ id }) => id === initialMockClient.id);
    expect(client).toBeDefined();
    expect(client).toBe(payload);
    expect(client?.name).toBe(NAME);
  });

  it("should edit sale", async () => {
    const { result } = useSalesReducer(mockedSalesInfoContextInitialState);
    const dispatch = result.current[1];
    const NAME = "TEST_EDIT";
    const payload = { ...initialMockSale, name: NAME };
    await waitFor(() =>
      dispatch({
        type: ActionsTypes.EDIT_SALE,
        payload: payload,
      })
    );
    const state = result.current[0];

    expect(asyncStorageSetItemMockFn).toBeCalled();
    const sale = state.sales.find(({ id }) => id === initialMockSale.id);
    expect(sale).toBeDefined();
    expect(sale).toBe(payload);
    expect(sale?.name).toBe(NAME);
  });

  it("should add payment to sale", async () => {
    const { result } = useSalesReducer(mockedSalesInfoContextInitialState);
    const dispatch = result.current[1];
    const installment: Omit<InstallmentItem, "id"> = {
      paymentDate: new Date().toISOString(),
      value: 15,
    };
    const paymentPayload = {
      saleId: initialMockSale.id,
      installment: installment,
    };
    await waitFor(() =>
      dispatch({
        type: ActionsTypes.ADD_SALES_PAYMENT,
        payload: paymentPayload,
      })
    );
    const state = result.current[0];

    const sale = state.sales.find(({ id }) => id === initialMockSale.id);
    expect(asyncStorageSetItemMockFn).toBeCalled();
    expect(sale).toBeDefined();
    expect(sale?.installments).toBeDefined();
    expect(sale?.installments).toHaveProperty(
      "[0].paymentDate",
      installment.paymentDate
    );
    expect(sale?.installments).toHaveProperty("[0].value", installment.value);
  });

  it("should reset the app state", async () => {
    const { result } = useSalesReducer(mockedSalesInfoContextInitialState);
    const dispatch = result.current[1];
    await waitFor(() =>
      dispatch({
        type: ActionsTypes.RESET_APP,
      })
    );
    const state = result.current[0];

    expect(asyncStorageSetItemMockFn).toBeCalled();
    expect(state.clients).toHaveLength(0);
    expect(state.sales).toHaveLength(0);
    expect(state.hasSyncedContacts).toBe(false);
  });

  it("should delete a sales payment", async () => {
    const { result } = useSalesReducer(mockedSalesInfoContextInitialState);
    const dispatch = result.current[1];
    const installmentId = saleWithInstallment.installments![0].id;
    await waitFor(() =>
      dispatch({
        type: ActionsTypes.DELETE_SALES_PAYMENT,
        payload: {
          saleId: saleWithInstallment.id,
          installmentId: installmentId,
        },
      })
    );
    const state = result.current[0];
    const sale = state.sales.find(({ id }) => id === saleWithInstallment.id);
    const installment = sale?.installments?.find(
      ({ id }) => id === installmentId
    );
    expect(asyncStorageSetItemMockFn).toBeCalled();
    expect(installment).toBeUndefined();
  });

  it("should sync clients with contacts", async () => {
    const { result } = useSalesReducer();
    const dispatch = result.current[1];
    const newClients = [clientWithNoSales, initialMockClient];
    await waitFor(() =>
      dispatch({
        type: ActionsTypes.SYNC_CLIENTS_WITH_CONTACTS,
        payload: newClients,
      })
    );
    const state = result.current[0];

    expect(asyncStorageSetItemMockFn).toBeCalled();
    expect(state.clients).toContain(initialMockClient);
    expect(state.clients).toContain(clientWithNoSales);
    expect(state.hasSyncedContacts).toBe(true);
  });
});
