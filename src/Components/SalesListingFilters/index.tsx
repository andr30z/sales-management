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

const dateFnsService = new DateFnsService();
interface SalesListingFiltersProps {
  filterFields: FilterFields;
  setFilterFields: Dispatch<SetStateAction<FilterFields>>;
}
/**
 *
 * @author andr30z
 **/
export const SalesListingFilters: React.FC<SalesListingFiltersProps> = ({
  filterFields,
  setFilterFields,
}) => {
  const theme = useTheme();
  const toggleAnimationState = useAnimationState({
    from: { height: 45 },
    closed: {
      height: 45,
    },
    open: {
      height: 230,
    },
  });

  const onToggle = () => {
    toggleAnimationState.transitionTo((prevState) => {
      return prevState === "open" ? "closed" : "open";
    });
  };
  const onChange = (key: string) => (value: string) =>
    setFilterFields((past) => ({ ...past, [key]: value }));
  const { clientName, finalDate, initialDate } = filterFields;
  return (
    <Container marginTop={30} width="100%">
      <MotiView style={styles.toggleContainer} state={toggleAnimationState}>
        <Container justifyContent="center" flex={null as any} alignItems="center" flexDirection="row">
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
            dateService={dateFnsService as any}
            date={initialDate}
            placeholder="Data inicial"
            onSelect={onChange("initialDate")}
          />
          <Datepicker
            style={styles.calendarInput}
            dateService={dateFnsService as any}
            date={finalDate}
            placeholder="Data final"
            onSelect={onChange("finalDate")}
          />
        </Container>
        <Button style={{ width: "100%", marginBottom: 10 }}>Filtrar</Button>
        <Divider style={{ backgroundColor: theme["color-primary-default"] }} />
      </MotiView>
    </Container>
  );
};
