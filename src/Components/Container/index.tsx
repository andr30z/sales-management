import React from "react";
import { View, ViewStyle } from "react-native";
type ContainerProps = ViewStyle & { center?: boolean };

/**
* 
* @author andr30z
**/
export const Container: React.FC<ContainerProps> = ({
  children,
  flex = 1,
  center = false,
  ...rest
}) => {
  const centerStyle = center
    ? { alignItems: "center", justifyContent: "center" }
    : {};
  return (
    <View style={{ flex, ...(centerStyle as any), ...rest }}>{children}</View>
  );
};
