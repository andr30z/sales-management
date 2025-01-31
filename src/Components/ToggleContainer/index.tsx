import { MotiView, UseAnimationState, useAnimationState, Variants } from "moti";
import React from "react";
import type { ViewStyle } from "react-native";
import { useBoolean } from "../../Hooks";
export interface ToggleContainer {
  children: (
    animationState: UseAnimationState<
      Variants<{
        closed: ViewStyle;
        open: ViewStyle;
        from: ViewStyle;
      }>
    >,
    toggle: () => void,
    isOpen: boolean
  ) => React.ReactNode;
  containerStyle: ViewStyle;
  onOpenStyle?: ViewStyle;
  onCloseStyle?: ViewStyle;
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
  const toggleAnimationState = useAnimationState(
    {
      closed: onCloseStyle as any,
      open: onOpenStyle as any,
      from: onCloseStyle as any,
    },
    { from: "from" }
  );
  const { value, toggle } = useBoolean();
  const onToggle = () => {
    const map = {
      true: "closed",
      false: "open",
      from: "open",
    } as const;
    toggleAnimationState.transitionTo(map[String(value) as keyof typeof map]);
    toggle();
  };
  return (
    <MotiView style={containerStyle} state={toggleAnimationState}>
      {children(toggleAnimationState as any, onToggle, value)}
    </MotiView>
  );
};
