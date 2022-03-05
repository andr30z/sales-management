import { Card, Text, useTheme } from "@ui-kitten/components";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { Dispatch, SetStateAction } from "react";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Sale } from "../../Context/SalesInfo/Reducer";
import { useClient } from "../../Hooks/useClient";
import { Container } from "../Container";
import { styles } from "./Styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useCommonThemeColors } from "../../Hooks/useCommonThemeColors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { useFormatRelativeDate } from "../../Hooks";
interface SalesListingItemProps {
  item: Sale;
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
  const navigation = useNavigation<StackNavigationProp<MainStackRoutesTypes>>();
  const isSelected = selectedPos > -1;
  const { name } = item;
  const { theme } = useCommonThemeColors();
  const date = useFormatRelativeDate(item.date);

  const onPressDeleteMode = () => {
    if (!isSelected) return setSelectedItems((past) => [...past, item.id]);
    setSelectedItems((past) => {
      const list = [...past];
      list.splice(selectedPos, 1);
      return list;
    });
  };

  const onPress = () => {
    navigation.navigate(MAIN_STACK_ROUTES.SALES_DETAILS, {
      saleId: item.id,
    });
  };
  const resolveTextColor = (optionalTextColor = "basic") =>
    isSelected ? "control" : optionalTextColor;

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
          <Text
            numberOfLines={1}
            status={resolveTextColor("primary")}
            category="s1"
          >
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
