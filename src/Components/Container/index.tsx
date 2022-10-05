import React from "react";
import { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";
type ContainerProps = Omit<ViewStyle, "flex"> & {
  center?: boolean;
  flex?: null | number;
} & { testID?: string };

/**
 *
 * @author andr30z
 **/
export const Container: React.FC<PropsWithChildren<ContainerProps>> = ({
  children,
  flex = 1,
  center = false,
  testID,
  ...rest
}) => {
  const centerStyle = center
    ? { alignItems: "center", justifyContent: "center" }
    : {};
  return (
    <View testID={testID} style={{ flex, ...(centerStyle as any), ...rest }}>
      {children}
    </View>
  );
};
