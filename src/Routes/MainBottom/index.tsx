import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { SalesListing } from "../../Screens/SalesListing";
import { MainBottomRoutesTypes, MAIN_BOTTOM_ROUTES } from "./Types";
const Bottom = createBottomTabNavigator<MainBottomRoutesTypes>();

export const MainBottom: React.FC = () => {
  return (
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
  );
};
