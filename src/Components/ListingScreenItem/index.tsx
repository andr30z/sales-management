import React, { Dispatch, SetStateAction } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ListingScreenItemParams, useListingScreenItem } from "../../Hooks";
import { Container } from "../Container";
import { Text } from "../Text";
import { styles } from "./Styles";

interface ChildrenPropsInterface<P> {
  item: P;
  styles: { [x: string]: any; textItem: any };
  resolveTextColor: (optionalTextColor?: string) => string;
}
export interface SalesListingItemProps<I>
  extends Pick<ListingScreenItemParams<I>, "dateKey" | "detailsRoute"> {
  item: I;
  index: number;
  onLongPress: () => void;
  selectedItems: Array<string>;
  setSelectedItems: Dispatch<SetStateAction<Array<string>>>;
  isInDeleteMode: boolean;
  name: string;
  children?: (props: ChildrenPropsInterface<I>) => React.ReactNode;
}

/**
 *
 * @author andr30z
 **/
export const ListingScreenItem = <I extends { id: string }>({
  item,
  onLongPress,
  selectedItems,
  isInDeleteMode,
  setSelectedItems,
  dateKey,
  detailsRoute,
  name,
  children,
}: SalesListingItemProps<I>) => {
  const {
    date,
    isSelected,
    onPress,
    onPressDeleteMode,
    resolveTextColor,
    theme,
  } = useListingScreenItem({
    detailsRoute,
    dateKey,
    item,
    selectedItems,
    setSelectedItems,
  });
  return (
    <Container
      {...styles.card}
      backgroundColor={isSelected ? theme["color-danger-400"] : undefined}
      borderColor={"#c3c3c3"}
    >
      <TouchableOpacity
        onPress={isInDeleteMode ? onPressDeleteMode : onPress}
        onLongPress={() => {
          onLongPress();
          onPressDeleteMode();
        }}
        delayLongPress={400}
        style={styles.touchable}
      >
        <Container height="100%" width="100%" flexDirection="column">
          <Text numberOfLines={1} status={resolveTextColor("primary")}>
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
              style={[styles.textItem]}
              category="c2"
            >
              {date}
            </Text>
            {children && children({ item, styles, resolveTextColor })}
          </Container>
        </Container>
      </TouchableOpacity>
    </Container>
  );
};
