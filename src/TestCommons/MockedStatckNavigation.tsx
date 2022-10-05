import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
interface MockedNavigatorProps {
  component: React.FC;
  params?: Partial<object | undefined>;
}
export const MockedStackNavigator: React.FC<MockedNavigatorProps> = ({
  component,
  params = {},
}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MockedScreen"
          component={component}
          initialParams={params}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
