import { AntDesign, Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Input, ListItem, Modal, Text } from "@ui-kitten/components";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView, useWindowDimensions
} from "react-native";
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import { globalStyles } from "../../GlobalStyles";
import { useBoolean, useClient, useKeyboardVisibility } from "../../Hooks";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES
} from "../../Routes/MainStack/Types";
import { Container } from "../Container";
import { SelectClientHeader } from "../SelectClientHeader";
import { styles } from "./Styles";

interface SelectClientProps {
  value: string;
  onChange: (value: string) => void;
  marginY?: string | number;
}

const ITEM_HEIGHT = 100;
/**
 *
 * @author andr30z
 **/
export const SelectClient: React.FC<SelectClientProps> = ({
  value,
  onChange,
  marginY = 0,
}) => {
  const { params } =
    useRoute<RouteProp<MainStackRoutesTypes, MAIN_STACK_ROUTES.SALES_FORM>>();

  const { value: isShowing, setTrue, setFalse } = useBoolean();
  const [clientName, setClientName] = useState("");

  const {
    salesInfo: { clients },
  } = useSalesInfoContext();

  useEffect(() => {
    if (params?.selectCreatedClient) setTrue();
  }, [params?.selectCreatedClient]);

  const { client } = useClient(value);
  const data = useMemo(
    () =>
    new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(clients.filter((c) =>
        c.name.toLowerCase().includes(clientName.toLowerCase())
      )),
    [clientName, clients]
  );
  const isVisible = useKeyboardVisibility();

  const navigation = useNavigation<StackNavigationProp<MainStackRoutesTypes>>();
  const { height } = useWindowDimensions();
  const renderListItem = useCallback(
    ((type: string | number, data: any, index: number, extendedState?: object | undefined) => (
      <ListItem
      style={{ flex:1 }}
      title={`${data.name} - ${data.phoneNumber}`}
      description={data.observation}
      accessoryLeft={
        <Ionicons style={{ marginHorizontal: 7 }} size={18} name="person" />
      }
      accessoryRight={() => (
        <Button
          onPress={() => {
            setFalse();
            onChange(data.id);
          }}
          size="small"
          status="warning"
        >
          <Text category="h5" status="control">
            SELECIONAR
          </Text>
        </Button>
      )}
    />)
    ),
    []
  );
  const {width}=useWindowDimensions();
  const layoutProvider = useRef(new LayoutProvider(()=> 0,  (_type, dim) => {
        dim.width = width;
        dim.height = 100;
    })).current;


  return (
    <Container
      marginTop={marginY}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <Input
        label="Cliente"
        value={client?.name || ""}
        style={styles.input}
        disabled
        textStyle={{ color: "black" }}
        size="small"
        placeholder="Selecione o cliente"
        accessoryRight={
          <Button
            onPress={setTrue}
            accessoryRight={() => (
              <AntDesign size={15} name="search1" color="#fff" />
            )}
          />
        }
      />

      <Modal
        style={{
          width: "95%",
          height: isVisible && isShowing ? height * 0.9 : "80%",
        }}
        backdropStyle={globalStyles.backdrop}
        onBackdropPress={setFalse}
        visible={isShowing}
      >
        <KeyboardAvoidingView style={{ flex: 1, flexDirection:"column" }}>
          <SelectClientHeader
            navigation={navigation}
            clientName={clientName}
            setClientName={setClientName}
            setFalse={setFalse}
            propsOnNavigateBack={params.formValues}
          />
          <RecyclerListView
            style={styles.list}
            layoutProvider={layoutProvider}
            dataProvider={data}
            rowRenderer={renderListItem}
          />
        </KeyboardAvoidingView>
      </Modal>
    </Container>
  );
};
