import { Feather, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, ViewStyle } from "react-native";
import { useCommonThemeColors, useWhatsappUtils } from "../../Hooks";
import { Container } from "../Container";
import { Text } from "../Text";
import { styles } from "./Styles";
interface WhatsappNumberProps {
  title?: string;
  phoneNumber: string;
  containerStyle?: ViewStyle;
}

export const WhatsappNumber: React.FC<WhatsappNumberProps> = ({
  phoneNumber,
  title,
  containerStyle,
}) => {
  const { warningColor, primaryColor } = useCommonThemeColors();
  const { copyToClipboard, onPressOpenWhatsapp } =
    useWhatsappUtils(phoneNumber);

  const whatsapp = (
    <Pressable onPress={copyToClipboard}>
      <Text
        style={title ? styles.linearGradientPhoneNumber : undefined}
        category={title ? "p2" : "h5"}
        status="control"
      >
        +{phoneNumber}{" "}
        <Feather name="copy" size={title ? 16 : 23} color="#fff" />
      </Text>
    </Pressable>
  );
  return (
    <LinearGradient
      colors={[warningColor, primaryColor]}
      style={[
        styles.linearGradient,
        !title && styles.containerNoTitle,
        containerStyle,
      ]}
      start={[0, 0]}
      end={[1, 0]}
    >
      {title && (
        <Container width="100%" flexDirection="column">
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            category="h6"
            status="control"
          >
            {title}
          </Text>
          {whatsapp}
        </Container>
      )}
      {!title && whatsapp}
      <Pressable onPress={onPressOpenWhatsapp}>
        <FontAwesome name="whatsapp" size={title ? 40 : 37} color="#fff" />
      </Pressable>
    </LinearGradient>
  );
};
