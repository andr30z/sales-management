import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { useBoolean } from "./useBoolean";

export function useKeyboardVisibility() {
  const { value: isVisible, setFalse, setTrue } = useBoolean();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      setTrue
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      setFalse
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isVisible;
}
