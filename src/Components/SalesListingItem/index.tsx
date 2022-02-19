import { Card, Text } from "@ui-kitten/components";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import React from "react";
import { useMemo } from "react";
import { Sales } from "../../Context/SalesInfo/Reducer";
import { useClient } from "../../Hooks/useClient";
import { styles } from "./Styles";
/**
 *
 * @author andr30z
 **/
export const SalesListingItem: React.FC<{ item: Sales }> = ({ item }) => {
  const { client } = useClient(item.clientId);
  const date = useMemo(
    () =>
      formatRelative(new Date(item.date), new Date(), {
        locale: ptBR,
      }),
    [item.date]
  );
  return (
    <Card style={styles.card} status="primary">
      <Text
        ellipsizeMode="tail"
        numberOfLines={2}
        category="s1"
        status="primary"
      >
        {item.name}
      </Text>
      <Text ellipsizeMode="tail" numberOfLines={2} category="s1" status="info">
        R$:{item.value}
      </Text>
      <Text category="s1" status="info">
        {client?.id}
      </Text>
      <Text category="s1" status="primary">
        {date}
      </Text>
    </Card>
  );
};
