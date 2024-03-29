import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { useEffect } from "react";
import * as Contacts from "expo-contacts";
import {
  Action,
  ActionsTypes,
  Client,
  INITIAL_STATE,
  reducer,
  SalesManagementState,
  STORAGE_KEY,
  uuidv4,
} from "./Reducer";
import { PropsWithChildren } from "react";
export interface SalesInfoContextInterface {
  salesInfo: SalesManagementState;
  dispatcher: React.Dispatch<Action>;
  syncContacts: (asyncStorageData: any) => Promise<void>;
}

export const SalesInfoContext = createContext<SalesInfoContextInterface>(
  {} as SalesInfoContextInterface
);

export const SalesInfo: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatcher] = useReducer(reducer, INITIAL_STATE);
  const isAlreadyInClientsList = (
    phones: Array<Contacts.PhoneNumber>,
    currentClients: Array<Client>
  ) => {
    return (
      currentClients.find((client) =>
        phones.find(
          (contact) =>
            contact.number && contact.number.includes(client.phoneNumber)
        )
      ) !== undefined
    );
  };
  const syncContacts = useCallback(async (asyncStorageData: any) => {
    // console.log(asyncStorageData);
    const convertedData: SalesManagementState = JSON.parse(asyncStorageData);
    if (convertedData?.hasSyncedContacts) return;
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") return;
    const { data } = await Contacts.getContactsAsync();

    const notSyncedContacts: Array<Client> = data
      .filter(
        ({ phoneNumbers }) =>
          phoneNumbers &&
          phoneNumbers.length > 0 &&
          !isAlreadyInClientsList(phoneNumbers, convertedData.clients)
      )
      .map(({ name, phoneNumbers }) => {
        return {
          createdAt: new Date().toISOString(),
          id: uuidv4(),
          name: name,
          observation:
            "Cliente adicionado por meio da sincronização de contatos.",
          phoneNumber: phoneNumbers
            ? (phoneNumbers[0].number as string).replace("+", "")
            : "",
        };
      });
    dispatcher({
      type: ActionsTypes.SYNC_CLIENTS_WITH_CONTACTS,
      payload: [...convertedData.clients, ...notSyncedContacts],
    });
  }, []);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null)
        return dispatcher({
          type: ActionsTypes.SET_CURRENT_STATE_WITH_STORAGE,
          payload: JSON.parse(value),
        });

      const initialData = {
        sales: [],
        clients: [],
        hasSyncedContacts: false,
      };
      dispatcher({
        type: ActionsTypes.SET_CURRENT_STATE_WITH_STORAGE,
        payload: initialData,
      });
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SalesInfoContext.Provider
      value={{ salesInfo: state, dispatcher, syncContacts }}
    >
      {children}
    </SalesInfoContext.Provider>
  );
};

export function useSalesInfoContext() {
  return useContext(SalesInfoContext);
}
