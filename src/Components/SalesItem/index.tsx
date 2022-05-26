import React from "react";
import { Sale } from "../../Context/SalesInfo/Reducer";
import { useClient } from "../../Hooks";
import { ListingScreenItem, SalesListingItemProps } from "../ListingScreenItem";
import { Text } from "../Text";

export const SalesItem: React.FC<
  Omit<SalesListingItemProps<Sale>, "children">
> = (props) => {
  const { client } = useClient(props.item.clientId);
  return (
    <ListingScreenItem {...props}>
      {({ item, styles, resolveTextColor }) => (
        <>
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
        </>
      )}
    </ListingScreenItem>
  );
};
