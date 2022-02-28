import {
  Button,
  Datepicker,
  Divider,
  Input,
  Text,
  useTheme,
} from "@ui-kitten/components";
import React, { Dispatch, SetStateAction } from "react";
import { Container } from "../Container";
import { AntDesign } from "@expo/vector-icons";
import { MotiView, useAnimationState } from "moti";
import { styles } from "./Styles";
import { DateFnsService } from "@ui-kitten/date-fns";
import { FilterFields } from "../../Interfaces/FilterFields";
import { brazilianDateService } from "../../Utils";


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
      height: 270,
    },
  });

  const onToggle = () => {
    toggleAnimationState.transitionTo((prevState) => {
      return prevState === "open" ? "closed" : "open";
    });
  };
  const onChange = (key: string) => (value: string) =>
    setFilterFields((past) => ({ ...past, [key]: value }));
  const { clientName, finalDate, initialDate, saleName } = filterFields;
  return (
    <Container marginTop={30} width="100%">
      <MotiView style={styles.toggleContainer} state={toggleAnimationState}>
        <Container
          justifyContent="center"
          flex={null as any}
          alignItems="center"
          flexDirection="row"
        >
          <Text style={{ textAlign: "center" }} category="h4" status="primary">
            Filtros
          </Text>
          <AntDesign
            name="eye"
            style={{ marginLeft: 10 }}
            color={theme["color-primary-default"]}
            onPress={onToggle}
            size={34}
          />
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
        <Container
          width="100%"
          flexDirection="row"
          marginTop={8}
          justifyContent="space-between"
        >
          <Datepicker
            style={styles.calendarInput}
            dateService={brazilianDateService as any}
            date={initialDate}
            placeholder="Data inicial"
            onSelect={onChange("initialDate")}
          />
          <Datepicker
            style={styles.calendarInput}
            dateService={brazilianDateService as any}
            date={finalDate}
            placeholder="Data final"
            onSelect={onChange("finalDate")}
          />
        </Container>

        <Container flexDirection="row" justifyContent="space-between">
          <Button size="small" style={styles.btns} onPress={onFilter}>
            Filtrar
          </Button>
          <Button
            onPress={onReset}
            size="small"
            appearance="outline"
            style={styles.btns}
          >
            Resetar
          </Button>
        </Container>
        <Divider />
      </MotiView>
    </Container>
  );
};
