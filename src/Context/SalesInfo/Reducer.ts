import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
export const initialUserState = { fetchedUser: false, user: {} };

export enum SalesTypes {
  JEWELRY,
  BIJOU,
  TROUSSEAU,
  OTHERS,
}

export enum SaleStatusType {
  PAID,
  UNPAID,
  OVERDUE_PAYMENT,
  CANCELED,
  REFOUNDED,
}

export const reversedSalesStatus = {
  [SaleStatusType.PAID]: "Paga",
  [SaleStatusType.UNPAID]: "Não paga",
  [SaleStatusType.CANCELED]: "Cancelada",
  [SaleStatusType.OVERDUE_PAYMENT]: "Em atraso",
  [SaleStatusType.REFOUNDED]: "Reembolsada",
};
export const reversedSalesTypes = {
  [SalesTypes.BIJOU]: "Bijou",
  [SalesTypes.JEWELRY]: "Joias",
  [SalesTypes.TROUSSEAU]: "Enxoval",
  [SalesTypes.OTHERS]: "Outros",
};
export interface Sale {
  name: string;
  id: string;
  description: string;
  value: string;
  date: string;
  clientId: string;
  types: Array<SalesTypes>;
  quantity: number;
  status: SaleStatusType;
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  observation: string;
  phoneNumber: string;
  createdAt: string;
}
export interface SalesManagementState {
  sales: Array<Sale>;
  clients: Array<Client>;
  hasSyncedContacts: boolean;
}

export enum ActionsTypes {
  ADD_SALES,
  DELETE_SALES,
  SET_CURRENT_STATE_WITH_STORAGE,
  ADD_CLIENT,
  DELETE_CLIENT,
  EDIT_CLIENT,
  EDIT_SALE,
  DELETE_MANY_SALES,
  SYNC_CLIENTS_WITH_CONTACTS,
}

export interface Action {
  payload: any;
  type: ActionsTypes;
}

export const STORAGE_KEY = "@sales-management-state";

export function uuidv4(): string {
  return uuid.v4().toString();
}

const updateStorage = (state: SalesManagementState) => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
};
const addToStateArray = (
  key: keyof SalesManagementState,
  state: SalesManagementState,
  payload: any
): SalesManagementState => {
  const stateArray = state[key] as any;
  return updateStorage({
    ...state,
    [key]: [
      ...stateArray,
      { ...payload, id: uuidv4(), createdAt: new Date().toISOString() },
    ],
  });
};

const editItemInArray = (
  key: keyof SalesManagementState,
  state: SalesManagementState,
  payload: any
) => {
  const array = [...(state[key] as any)];
  const position = array.findIndex((x) => x.id === payload.id);
  array[position] = payload;
  return updateStorage({
    ...state,
    [key]: array,
  });
};

const deleteItem = (
  key: keyof SalesManagementState,
  state: SalesManagementState,
  payload: any
) => {
  const array = [...(state[key] as any)];
  const pos = array.findIndex((x) => x.id === payload);
  array.splice(pos, 1);
  return updateStorage({ ...state, [key]: array });
};

const deleteMany = (
  key: keyof SalesManagementState,
  state: SalesManagementState,
  payload: Array<string>
) => {
  const array = [...(state[key] as any)];
  return updateStorage({
    ...state,
    [key]: array.filter((x) => !payload.includes(x.id)),
  });
};

const clientHasSale = (clientId: string, sales: Array<Sale>) =>
  sales.find((sale) => sale.clientId === clientId) !== undefined;

const verifyClientDeletion = (
  state: SalesManagementState,
  {
    clients,
    onError,
    onSuccess,
  }: {
    clients: Array<{ name: string; id: string }>;
    onSuccess: () => void;
    onError: () => void;
  },
  onOkCallback: () => SalesManagementState
) => {
  let hasError = false;
  clients.forEach((client) => {
    if (clientHasSale(client.id, state.sales)) {
      global.toast.show(
        `Não é possível deletar o(a) cliente ${client.name}, pois este possui vendas cadastradas.`,
        { type: "danger" }
      );
      hasError = true;
    }
  });
  if (hasError) onError();
  else onSuccess();
  return hasError ? state : onOkCallback();
};
export const INITIAL_STATE: SalesManagementState = {
  clients: [],
  sales: [],
  hasSyncedContacts: false,
};
export const reducer = (
  state: SalesManagementState,
  action: Action
): SalesManagementState => {
  const { payload, type } = action;
  switch (type) {
    case ActionsTypes.SET_CURRENT_STATE_WITH_STORAGE:
      return payload;
    case ActionsTypes.DELETE_CLIENT:
      return verifyClientDeletion(state, payload, () =>
        deleteMany(
          "clients",
          state,
          payload.clients.map((c: { id: string }) => c.id)
        )
      );
    case ActionsTypes.ADD_CLIENT:
      return addToStateArray("clients", state, payload);
    case ActionsTypes.EDIT_CLIENT:
      return editItemInArray("clients", state, payload);
    case ActionsTypes.EDIT_SALE:
      return editItemInArray("sales", state, payload);
    case ActionsTypes.ADD_SALES:
      return addToStateArray("sales", state, payload);
    case ActionsTypes.DELETE_SALES:
      return deleteItem("sales", state, payload);
    case ActionsTypes.DELETE_MANY_SALES:
      return deleteMany("sales", state, payload);
    case ActionsTypes.SYNC_CLIENTS_WITH_CONTACTS:
      return updateStorage({
        ...state,
        clients: payload,
        hasSyncedContacts: true,
      });
    default:
      return state;
  }
};
