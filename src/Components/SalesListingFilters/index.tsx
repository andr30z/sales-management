import { AntDesign } from "@expo/vector-icons";
import { Button, Datepicker, Divider, Input } from "@ui-kitten/components";
import { EvaStatus } from "@ui-kitten/components/devsupport";
import React, { Dispatch, SetStateAction } from "react";
import { Keyboard, Pressable } from "react-native";
import { ListingFiltersProps } from "../../Interfaces/ListingFilters";
import { SalesFilterFields } from "../../Interfaces/SalesFilterFields";
import { brazilianDateService, minDate } from "../../Utils";
import { Container } from "../Container";
import { KittenSelect } from "../KittenSelect";
import { Text } from "../Text";
import { ToggleContainer } from "../ToggleContainer";
import { styles } from "./Styles";

/**
 *
 * @author andr30z
 **/
export const SalesListingFiltersNoMemo: React.FC<
  ListingFiltersProps<SalesFilterFields> & { useClientNameInput?: boolean }
> = ({
  filterFields,
  setFilterFields,
  onFilter,
  onReset,
  useClientNameInput = true,
  mainColor = "primary",
  iconColors,
}) => {
  const { clientName, finalDate, initialDate, saleName, saleStatus } =
    filterFields;
  return (
    <ToggleContainer
      containerStyle={styles.toggleContainer}
      onOpenStyle={{
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
              placeholder="Nome da venda"
              value={saleName}
              status={mainColor}
              onChangeText={onChange("saleName")}
            />
            {useClientNameInput && (
              <Input
                style={styles.input}
                placeholder="Nome do cliente"
                value={clientName}
                status={mainColor}
                onChangeText={onChange("clientName")}
              />
            )}
            <KittenSelect
              multiSelect={false}
              selectStyle={styles.input}
              value={saleStatus}
              status={mainColor}
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
                if (Array.isArray(index)) return;
                setFilterFields((past) => ({
                  ...past,
                  saleStatus: index.row,
                }));
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
                status={mainColor}
                placeholder="Data inicial"
                onSelect={onChange("initialDate")}
              />
              <Datepicker
                style={styles.calendarInput}
                dateService={brazilianDateService as any}
                date={finalDate}
                status={mainColor}
                placeholder="Data final"
                min={minDate as any}
                onSelect={onChange("finalDate")}
              />
            </Container>

            <Container flexDirection="row" justifyContent="space-between">
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

export const SalesListingFilters = React.memo(SalesListingFiltersNoMemo);
