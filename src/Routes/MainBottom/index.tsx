import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MainBottomRoutesTypes, MAIN_BOTTOM_ROUTES } from "./Types";
import { SalesListing } from "../../Screens/SalesListing";
const Bottom = createBottomTabNavigator<MainBottomRoutesTypes>();

export const MainBottom: React.FC = () => {
  return (
    <NavigationContainer>
      <Bottom.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Bottom.Screen
          name={MAIN_BOTTOM_ROUTES.SALES_LISTING}
          component={SalesListing}
        />
      </Bottom.Navigator>
    </NavigationContainer>
  );
};
