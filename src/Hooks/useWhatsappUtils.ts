import { Linking } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useCallback } from "react";

export function useWhatsappUtils(phone: string) {
  const copyToClipboard = useCallback(async () => {
    await Clipboard.setStringAsync(phone);
  }, [phone]);

  const onPressOpenWhatsapp = useCallback(() => {
    Linking.canOpenURL("whatsapp://send").then((supported) => {
      return Linking.openURL(
        supported
          ? `whatsapp://send?phone=${phone}`
          : `https://api.whatsapp.com/send?phone=${phone}i`
      );
    });
  }, [phone]);

  return {
    copyToClipboard,
    onPressOpenWhatsapp,
  };
}
