import React from "react";
import { useCommonThemeColors } from "../../Hooks";
import { Container } from "../Container";
import { Text } from "../Text";
import { styles } from "./Styles";
interface SaleInfoListItemProps {
  label: string;
  value: string | number;
  valueNumLines?: number;
  showBorder?: boolean;
  /**
   * String percentage. e.g: "100%".
   * @author andr30z
   **/
  valueTextLimit?: string;
}
export const SaleInfoListItem: React.FC<SaleInfoListItemProps> = ({
  label,
  value,
  valueNumLines = 1,
  showBorder = true,
  valueTextLimit = "45%",
}) => {
  const { warningColor } = useCommonThemeColors();
  return (
    <Container
      {...styles.itemContainer}
      borderBottomWidth={showBorder ? 0.47 : undefined}
      borderBottomColor={warningColor}
      flex={null as any}
    >
      <Text
        status="warning"
        numberOfLines={2}
        ellipsizeMode="tail"
        category="c1"
        style={styles.textLimit}
      >
        {label}
      </Text>
      <Text
        status="warning"
        fontFamily="other"
        category="c1"
        numberOfLines={valueNumLines}
        ellipsizeMode="tail"
        style={[{ maxWidth: valueTextLimit }, styles.textValue]}
      >
        {value}
      </Text>
    </Container>
  );
};
