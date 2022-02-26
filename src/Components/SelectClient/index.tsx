import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Button,
  Card,
  Input,
  List,
  ListItem,
  Modal,
  Text,
} from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import { globalStyles } from "../../GlobalStyles";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { Container } from "../Container";
import { styles } from "./Styles";
import { SelectClientHeader } from "../SelectClientHeader";
import { useClient, useKeyboardVisibility, useBoolean } from "../../Hooks";

interface SelectClientProps {
  value: string;
  onChange: (value: string) => void;
  marginY?: string | number;
}

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
      clients.filter((c) =>
        c.name.toLowerCase().includes(clientName.toLowerCase())
      ),
    [clientName, clients]
  );
  const isVisible = useKeyboardVisibility();

  const navigation = useNavigation<StackNavigationProp<MainStackRoutesTypes>>();
  const { height } = useWindowDimensions();
  return (
    <Container
      marginTop={marginY}
      // center
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <Input
        value={client?.name || ""}
        style={styles.input}
        disabled
        placeholder="Selecione o cliente"
      />
      <Button
        size="medium"
        onPress={setTrue}
        accessoryRight={() => (
          <AntDesign size={16} name="search1" color="#fff" />
        )}
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
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <List
            style={styles.list}
            ListHeaderComponent={
              <SelectClientHeader
                navigation={navigation}
                clientName={clientName}
                setClientName={setClientName}
                setFalse={setFalse}
              />
            }
            data={data}
            renderItem={({ item }) => (
              <ListItem
                title={`${item.name} - ${item.phoneNumber}`}
                description={item.observation}
                accessoryLeft={() => (
                  <Ionicons
                    style={{ marginHorizontal: 7 }}
                    size={18}
                    name="person"
                  />
                )}
                accessoryRight={() => (
                  <Button
                    onPress={() => {
                      setFalse();
                      onChange(item.id);
                    }}
                    size="small"
                    status="warning"
                  >
                    SELECIONAR
                  </Button>
                )}
              />
            )}
          />
        </KeyboardAvoidingView>
      </Modal>
    </Container>
  );
};
