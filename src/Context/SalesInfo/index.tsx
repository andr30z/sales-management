import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";
import {
  Action,
  ActionsTypes,
  INITIAL_STATE,
  reducer,
  SalesManagementState,
  STORAGE_KEY,
} from "./Reducer";
interface SalesInfoContextInterface {
  salesInfo: SalesManagementState;
  dispatcher: React.Dispatch<Action>;
}

const SalesInfoContext = createContext<SalesInfoContextInterface>(
  {} as SalesInfoContextInterface
);

export const SalesInfo: React.FC = ({ children }) => {
  const [state, dispatcher] = useReducer(reducer, INITIAL_STATE);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        dispatcher({
          type: ActionsTypes.SET_CURRENT_STATE_WITH_STORAGE,
          payload: JSON.parse(value),
        });
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SalesInfoContext.Provider value={{ salesInfo: state, dispatcher }}>
      {children}
    </SalesInfoContext.Provider>
  );
};

export function useSalesInfoContext() {
  return useContext(SalesInfoContext);
}
