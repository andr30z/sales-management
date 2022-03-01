import { Card, Text, useTheme } from "@ui-kitten/components";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { Dispatch, SetStateAction } from "react";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Sales } from "../../Context/SalesInfo/Reducer";
import { useClient } from "../../Hooks/useClient";
import { Container } from "../Container";
import { styles } from "./Styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useCommonThemeColors } from "../../Hooks/useCommonThemeColors";
interface SalesListingItemProps {
  item: Sales;
  index: number;
  onLongPress: () => void;
  selectedItems: Array<string>;
  setSelectedItems: Dispatch<SetStateAction<Array<string>>>;
  isInDeleteMode: boolean;
}

/**
 *
 * @author andr30z
 **/
export const SalesListingItem: React.FC<SalesListingItemProps> = ({
  item,
  // index,
  onLongPress,
  selectedItems,
  isInDeleteMode,
  setSelectedItems,
}) => {
  const { client } = useClient(item.clientId);
  const selectedPos = useMemo(
    () => selectedItems.findIndex((id) => id === item.id),
    [selectedItems]
  );
  const isSelected = selectedPos > -1;
  const { name } = item;
  const { dangerColor, theme } = useCommonThemeColors();
  const date = useMemo(
    () =>
      formatRelative(new Date(item.date), new Date(), {
        locale: ptBR,
      }),
    [item.date]
  );

  const onPressDeleteMode = () => {
    if (!isSelected) return setSelectedItems((past) => [...past, item.id]);
    setSelectedItems((past) => {
      const list = [...past];
      list.splice(selectedPos, 1);
      return list;
    });
  };

  const onPress = () => {};
  const resolveTextColor = (optionalTextColor="basic")=>isSelected?"control":optionalTextColor;

  return (
    <Container
      {...styles.card}
      backgroundColor={isSelected ? theme["color-danger-400"] : undefined}
      borderColor={"#c3c3c3"}
    >
      <TouchableOpacity
        onPress={isInDeleteMode ? onPressDeleteMode : onPress}
        onLongPress={onLongPress}
        delayLongPress={400}
        style={styles.touchable}
      >
        <Container height="100%" width="100%" flexDirection="column">
          <Text numberOfLines={1} status={resolveTextColor("primary")} category="s1">
            {name}
          </Text>
          <Container
            flex={null as any}
            width="100%"
            flexDirection="row"
            alignItems="baseline"
          >
            <Text
              status={resolveTextColor()}
              numberOfLines={1}
              style={styles.textItem}
              category="c2"
            >
              {date}
            </Text>
            <Text
              status={resolveTextColor()}
              numberOfLines={1}
              style={styles.textItem}
              category="c1"
            >
              R$: {item.value}
            </Text>
            <Text
              numberOfLines={1}
              style={styles.textItem}
              category="c1"
              status={resolveTextColor("primary")}
            >
              {client?.name || ""}
            </Text>
          </Container>
        </Container>
      </TouchableOpacity>
    </Container>
  );
};
