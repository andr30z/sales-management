import AsyncStorage from "@react-native-async-storage/async-storage";

export const initialUserState = { fetchedUser: false, user: {} };

interface Sales {
  name: string;
  description: string;
  value: string;
  date: string;
  clientId: string;
}

interface Client {
  id: string;
  name: string;
  observation: string;
  phoneNumber: string;
}
export interface SalesManagementState {
  sales: Array<Sales>;
  clients: Array<Client>;
}

export enum ActionsTypes {
  ADD_SALES,
  DELETE_SALES,
  SET_CURRENT_STATE_WITH_STORAGE,
  ADD_CLIENT,
  DELETE_CLIENT,
  EDIT_CLIENT,
}

export interface Action {
  payload: any;
  type: ActionsTypes;
}

export const STORAGE_KEY = "@sales-management-state";

const updateStorage = (state: SalesManagementState) => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
};
const addToStateArray = (
  key: string,
  state: SalesManagementState,
  payload: any
): SalesManagementState => {
  return updateStorage({ ...state, [key]: [...state[key], payload] });
};

const deleteItem = (key: string, state: SalesManagementState, payload: any) => {
  const array = [...state[key]];
  array.splice(payload as number, 1);
  return updateStorage({ ...state, [key]: array });
};

export const INITIAL_STATE: SalesManagementState = {
  clients: [],
  sales: [],
};
export const reducer = (state: SalesManagementState, action: Action):SalesManagementState => {
  const { payload, type } = action;
  switch (type) {
    case ActionsTypes.SET_CURRENT_STATE_WITH_STORAGE:
      return payload;
    case ActionsTypes.ADD_CLIENT:
      return addToStateArray("clients", state, payload);
    case ActionsTypes.ADD_SALES:
      return addToStateArray("sales", state, payload);
    case ActionsTypes.DELETE_SALES:
      return deleteItem("sales", state, payload);
    default:
      return state;
  }
};
