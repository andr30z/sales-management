import { AntDesign, Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Input, ListItem, Modal } from "@ui-kitten/components";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  DimensionValue,
  KeyboardAvoidingView,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import { Client } from "../../Context/SalesInfo/Reducer";
import { globalStyles } from "../../GlobalStyles";
import {
  useBoolean,
  useClient,
  useCommonThemeColors,
  useKeyboardVisibility,
} from "../../Hooks";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { Container } from "../Container";
import { FormErrorDisplayer } from "../FormErrorDisplayer";
import { PerformaticList, RenderPerformaticItem } from "../PerformaticList";
import { SelectClientHeader } from "../SelectClientHeader";
import { Text } from "../Text";
import { styles } from "./Styles";

interface SelectClientProps {
  value: string;
  onChange: (value: string) => void;
  marginY?: DimensionValue;
  error?: string;
}

// const ITEM_HEIGHT = 100;
/**
 *
 * @author andr30z
 **/
export const SelectClientNoMemo: React.FC<SelectClientProps> = ({
  value,
  onChange,
  marginY = 0,
  error,
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
  const { primaryColor } = useCommonThemeColors();
  const renderListItem: RenderPerformaticItem<Client> = useCallback(
    (_type, data, _index, _extendedState) => (
      <ListItem
        style={{ flex: 1 }}
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
      />
    ),
    []
  );

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
        accessoryRight={(props)=>
          <Pressable onPress={setTrue}>
            <AntDesign
              style={styles.inputIcon}
              size={25}
              name="user"
              color={primaryColor}
              {...props} 
            />
          </Pressable>
        }
        caption={<FormErrorDisplayer text={error} />}
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
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: "column" }}>
          <SelectClientHeader
            navigation={navigation}
            clientName={clientName}
            setClientName={setClientName}
            setFalse={setFalse}
            propsOnNavigateBack={params.formValues}
          />
          <PerformaticList<Client> style={styles.list} data={data}>
            {renderListItem}
          </PerformaticList>
        </KeyboardAvoidingView>
      </Modal>
    </Container>
  );
};

export const SelectClient = React.memo(SelectClientNoMemo);
