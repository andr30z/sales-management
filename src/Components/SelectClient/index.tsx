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
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import { globalStyles } from "../../GlobalStyles";
import { useBoolean } from "../../Hooks/useBoolean";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { Container } from "../Container";
import { styles } from "./Styles";

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

  const {
    salesInfo: { clients },
  } = useSalesInfoContext();

  useEffect(() => {
    if (params?.selectCreatedClient) setTrue();
  }, [params?.selectCreatedClient]);

  const navigation = useNavigation<StackNavigationProp<MainStackRoutesTypes>>();
  return (
    <Container
      marginTop={marginY}
      // center
      flex={null as any}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <Input value={value} disabled style={styles.input} />
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
          height: "80%",
        }}
        backdropStyle={globalStyles.backdrop}
        onBackdropPress={setFalse}
        visible={isShowing}
      >
        <List
          style={styles.list}
          ListHeaderComponent={() => (
            <Container
              width="100%"
              flexDirection="row"
              padding={15}
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Text category="h5" status="success">
                Selecione o cliente
              </Text>
              <Button
                size="small"
                status="success"
                style={styles.btnAddPerson}
                onPress={() => {
                  setFalse();
                  navigation.navigate(MAIN_STACK_ROUTES.CLIENTS_FORM, {
                    routeOnSubmit: MAIN_STACK_ROUTES.SALES_FORM,
                  });
                }}
                accessoryLeft={() => (
                  <Ionicons name="person-add-sharp" size={18} color="#fff" />
                )}
              />
            </Container>
          )}
          data={clients}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.name} - ${item.phoneNumber}`}
              description={item.observation}
              accessoryLeft={(props) => <Ionicons size={18} name="person" />}
              accessoryRight={() => (
                <Button
                  onPress={() => onChange(item.id)}
                  size="tiny"
                  status="success"
                >
                  SELECIONAR
                </Button>
              )}
            />
          )}
        />
      </Modal>
    </Container>
  );
};
