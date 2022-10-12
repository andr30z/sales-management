import React from "react";
import NumberFormat from "react-number-format";
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
          <NumberFormat
            value={item.value}
            displayType={"text"}
            fixedDecimalScale
            decimalSeparator=","
            decimalScale={2}
            allowLeadingZeros
            allowEmptyFormatting
            isNumericString
            prefix={"R$ "}
            renderText={(value) => (
              <Text
                status={resolveTextColor()}
                numberOfLines={1}
                style={styles.textItem}
                category="c1"
              >
                {value}
              </Text>
            )}
          />

          <Text
            numberOfLines={1}
            style={[styles.textItem]}
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
