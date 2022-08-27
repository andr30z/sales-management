import React from "react";
import { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";
type ContainerProps = Omit<ViewStyle, "flex"> & { center?: boolean; flex?: null | number };

/**
 *
 * @author andr30z
 **/
export const Container: React.FC<PropsWithChildren<ContainerProps>> = ({
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
