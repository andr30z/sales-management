import { AntDesign } from "@expo/vector-icons";
import {
  Button,
  Datepicker,
  Divider,
  Input,
  useTheme,
} from "@ui-kitten/components";
import { MotiView, useAnimationState } from "moti";
import React, { Dispatch, SetStateAction } from "react";
import { Keyboard, Pressable } from "react-native";
import { FilterFields } from "../../Interfaces/FilterFields";
import { brazilianDateService, minDate } from "../../Utils";
import { Container } from "../Container";
import { KittenSelect } from "../KittenSelect";
import { Text } from "../Text";
import { styles } from "./Styles";

interface SalesListingFiltersProps {
  onFilter: () => void;
  filterFields: FilterFields;
  setFilterFields: Dispatch<SetStateAction<FilterFields>>;
  onReset: () => void;
}
/**
 *
 * @author andr30z
 **/
export const SalesListingFilters: React.FC<SalesListingFiltersProps> = ({
  filterFields,
  setFilterFields,
  onFilter,
  onReset,
}) => {
  const theme = useTheme();
  const toggleAnimationState = useAnimationState({
    from: { height: 45 },
    closed: {
      height: 45,
    },
    open: {
      height: 300,
      backgroundColor: "white",
      zIndex: 10000,
    },
  });

  const onToggle = () => {
    toggleAnimationState.transitionTo((prevState) => {
      return prevState === "open" ? "closed" : "open";
    });
  };
  const onChange = (key: string) => (value: string) =>
    setFilterFields((past) => ({ ...past, [key]: value }));
  const onBtnAction = (action: () => void) => () => {
    Keyboard.dismiss();
    onToggle();
    action();
  };
  const { clientName, finalDate, initialDate, saleName, saleStatus } =
    filterFields;
  return (
    <MotiView style={styles.toggleContainer} state={toggleAnimationState}>
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
          status="primary"
        >
          Filtros
        </Text>
        <Pressable onPress={onToggle}>
          <AntDesign
            name="eye"
            style={{ marginLeft: 10 }}
            color={theme["color-primary-default"]}
            size={34}
          />
        </Pressable>
      </Container>
      <Input
        style={styles.input}
        placeholder="Nome da venda"
        value={saleName}
        onChangeText={onChange("saleName")}
      />
      <Input
        style={styles.input}
        placeholder="Nome do cliente"
        value={clientName}
        onChangeText={onChange("clientName")}
      />
      <KittenSelect
        multiSelect={false}
        selectStyle={styles.input}
        value={saleStatus}
        placeholder="Status da venda"
        options={[
          "Todos",
          "Paga",
          "Não paga",
          "Em atraso",
          "Cancelada",
          "Reembolsada",
        ]}
        onChange={(index) => {
          console.log(index);
          if (Array.isArray(index)) return;
          setFilterFields((past) => ({ ...past, saleStatus: index.row }));
        }}
      />
      <Container
        width="100%"
        flexDirection="row"
        marginTop={8}
        justifyContent="space-between"
      >
        <Datepicker
          style={styles.calendarInput}
          dateService={brazilianDateService as any}
          min={minDate as any}
          date={initialDate}
          placeholder="Data inicial"
          onSelect={onChange("initialDate")}
        />
        <Datepicker
          style={styles.calendarInput}
          dateService={brazilianDateService as any}
          date={finalDate}
          placeholder="Data final"
          min={minDate as any}
          onSelect={onChange("finalDate")}
        />
      </Container>

      <Container flexDirection="row" justifyContent="space-between">
        <Button
          size="small"
          style={styles.btns}
          onPress={onBtnAction(onFilter)}
        >
          Filtrar
        </Button>
        <Button
          onPress={onBtnAction(onReset)}
          size="small"
          appearance="outline"
          style={styles.btns}
        >
          Resetar
        </Button>
      </Container>
      <Divider />
    </MotiView>
  );
};
