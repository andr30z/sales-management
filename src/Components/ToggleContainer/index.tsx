import { MotiView, UseAnimationState, useAnimationState, Variants } from "moti";
import React from "react";
import { ViewStyle } from "react-native";
import { useBoolean } from "../../Hooks";
type ToggleStyle = { [x: string]: any };
export interface ToggleContainer {
  children: (
    animationState: UseAnimationState<{
      closed: ToggleStyle;
      open: ToggleStyle;
      from: ToggleStyle;
    }>,
    toggle: () => void,
    isOpen: boolean
  ) => React.ReactNode;
  containerStyle: ViewStyle;
  onOpenStyle?: ToggleStyle;
  onCloseStyle?: ToggleStyle;
}

/**
 *
 * @author andr30z
 **/
export const ToggleContainer: React.FC<ToggleContainer> = ({
  children,
  containerStyle,
  onCloseStyle = { height: 45 },
  onOpenStyle = {
    height: 300,
    backgroundColor: "white",
    zIndex: 10000,
  },
}) => {
  const toggleAnimationState = useAnimationState({
    closed: onCloseStyle,
    open: onOpenStyle,
    from: onCloseStyle,
  });
  const { value, toggle } = useBoolean();
  const onToggle = () => {
    toggleAnimationState.transitionTo((prevState) => {
      return prevState === "open" ? "closed" : "open";
    });
    toggle();
  };
  return (
    <MotiView style={containerStyle} state={toggleAnimationState}>
      {children(toggleAnimationState, onToggle, value)}
    </MotiView>
  );
};
