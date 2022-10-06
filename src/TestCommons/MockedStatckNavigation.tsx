import React from "react";
import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
interface MockedNavigatorProps {
  component?: React.FC;
  params?: Partial<object | undefined>;
  children?: (props: {
    route: RouteProp<ParamListBase, string>;
    navigation: any;
  }) => React.ReactNode;
}
export const MockedStackNavigator: React.FC<MockedNavigatorProps> = ({
  component,
  params = {},
  children,
}) => {
  const props = {
    name: "MockedScreen",
    initialParams: params,
    component,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen {...(props as any)}>{children}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
