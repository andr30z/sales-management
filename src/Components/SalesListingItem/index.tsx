import { Card, Text, useTheme } from "@ui-kitten/components";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import React from "react";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Sales } from "../../Context/SalesInfo/Reducer";
import { useClient } from "../../Hooks/useClient";
import { Container } from "../Container";
import { styles } from "./Styles";
import { MaterialIcons } from "@expo/vector-icons";
interface SalesListingItemProps {
  item: Sales;
  index: number;
  onLongPress: () => void;
}

/**
 *
 * @author andr30z
 **/
export const SalesListingItem: React.FC<SalesListingItemProps> = ({
  item,
  index,
  onLongPress,
}) => {
  const { client } = useClient(item.clientId);
  const { name } = item;
  const theme = useTheme();
  const isEven = (index + 1) % 2 === 0;
  const date = useMemo(
    () =>
      formatRelative(new Date(item.date), new Date(), {
        locale: ptBR,
      }),
    [item.date]
  );

  return (
    <Container
      {...styles.card}
      borderColor={isEven ? theme["color-primary-default"] : "#c3c3c3"}
    >
      <TouchableOpacity
        onPress={() => null}
        onLongPress={onLongPress}
        delayLongPress={800}
        style={styles.touchable}
      >
        <Container height="100%" width="100%" flexDirection="column">
          <Text numberOfLines={1} status="primary" category="s1">
            {name}
          </Text>
          <Container
            flex={null as any}
            width="100%"
            flexDirection="row"
            alignItems="baseline"
          >
            <Text numberOfLines={1} style={styles.textItem} category="c2">
              {date}
            </Text>
            <Text numberOfLines={1} style={styles.textItem} category="c1">
              R$: {item.value}
            </Text>
            <Text
              numberOfLines={1}
              style={styles.textItem}
              category="c1"
              status="primary"
            >
              {client?.name || ""}
            </Text>
          </Container>
        </Container>
      </TouchableOpacity>
    </Container>
  );
};
