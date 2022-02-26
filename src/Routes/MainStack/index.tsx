import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SalesForm } from "../../Screens/SalesForm";
import { MainBottom } from "../MainBottom";
import { MainStackRoutesTypes, MAIN_STACK_ROUTES } from "./Types";
const Stack = createStackNavigator<MainStackRoutesTypes>();

export const MainStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={MAIN_STACK_ROUTES.BOTTOM_NAV}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={MAIN_STACK_ROUTES.BOTTOM_NAV}
          component={MainBottom}
        />
        <Stack.Screen
          name={MAIN_STACK_ROUTES.SALES_FORM}
          component={SalesForm}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
