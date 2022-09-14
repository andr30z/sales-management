import { AntDesign } from "@expo/vector-icons";
import { Button, Divider, Input } from "@ui-kitten/components";
import React from "react";
import { Keyboard, Pressable } from "react-native";
import { ClientFilterFields } from "../../Interfaces/ClientsFilterFields";
import { ListingFiltersProps } from "../../Interfaces/ListingFilters";
import { Container } from "../Container";
import { Text } from "../Text";
import { ToggleContainer } from "../ToggleContainer";
import { styles } from "./Styles";

/**
 *
 * @author andr30z
 **/
export const ClientsListingFilter: React.FC<
  ListingFiltersProps<ClientFilterFields>
> = ({
  filterFields,
  setFilterFields,
  onFilter,
  onReset,
  mainColor = "primary",
  iconColors,
}) => {
  const { name, phoneNumber, observation } = filterFields;
  return (
    <ToggleContainer
      containerStyle={styles.toggleContainer}
      onOpenStyle={{
        // backgroundColor: "white",
        height: 300,
        zIndex: 10000,
      }}
      onCloseStyle={{ height: 42 }}
    >
      {(_, onToggle) => {
        const onChange = (key: string) => (value: string) =>
          setFilterFields((past) => ({ ...past, [key]: value }));
        const onBtnAction = (action: () => void) => () => {
          Keyboard.dismiss();
          onToggle();
          action();
        };
        return (
          <>
            <Container
              justifyContent="center"
              flex={null as any}
              alignItems="center"
              flexDirection="row"
            >
              <Text
                style={{ textAlign: "center" }}
                fontFamily="subtitles"
                category="h5"
                status={mainColor}
              >
                Filtros
              </Text>
              <Pressable onPress={onToggle}>
                <AntDesign
                  name="eye"
                  style={{ marginLeft: 10 }}
                  color={iconColors}
                  size={34}
                />
              </Pressable>
            </Container>
            <Input
              style={styles.input}
              placeholder="Nome do Cliente"
              value={name}
              status={mainColor}
              onChangeText={onChange("name")}
            />
            <Input
              style={styles.input}
              placeholder="Telefone EX: 5561999999999"
              value={phoneNumber}
              status={mainColor}
              keyboardType="number-pad"
              onChangeText={onChange("phoneNumber")}
            />
            <Input
              style={styles.input}
              placeholder="Observação"
              value={observation}
              status={mainColor}
              onChangeText={onChange("observation")}
            />
            <Container marginTop={10} flexDirection="row" justifyContent="space-between">
              <Button
                size="small"
                style={styles.btns}
                status={mainColor}
                onPress={onBtnAction(onFilter)}
              >
                Filtrar
              </Button>
              <Button
                onPress={onBtnAction(onReset)}
                size="small"
                appearance="outline"
                status={mainColor}
                style={styles.btns}
              >
                Resetar
              </Button>
            </Container>
            <Divider />
          </>
        );
      }}
    </ToggleContainer>
  );
};
