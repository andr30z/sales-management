import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { ClientsListing } from "../../Screens/ClientsListing";
import { SalesListing } from "../../Screens/SalesListing";
import { Settings } from "../../Screens/Settings";
import { MainBottomRoutesTypes, MAIN_BOTTOM_ROUTES } from "./Types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Bottom = createBottomTabNavigator<MainBottomRoutesTypes>();
export const MainBottom: React.FC = () => {
  const theme = useTheme();
  const primaryTheme = theme["color-primary-default"];
  return (
    <Bottom.Navigator
      screenOptions={{
        headerShown: false,
        tabBarItemStyle: { paddingVertical: 1 },
        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: primaryTheme,
        tabBarInactiveTintColor: "#fff",
      }}
    >
      <Bottom.Screen
        name={MAIN_BOTTOM_ROUTES.SALES_LISTING}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color, size }: any) => (
            <MaterialCommunityIcons
              name="point-of-sale"
              size={size ? size : 24}
              color={focused ? color : primaryTheme}
              focused={focused}
            />
          ),
        }}
        component={SalesListing}
      />
      <Bottom.Screen
        name={MAIN_BOTTOM_ROUTES.CLIENTS_LISTING}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color, size }: any) => (
            <Ionicons
              name="person-circle"
              size={size ? size : 24}
              color={focused ? color : primaryTheme}
              focused={focused}
            />
          ),
        }}
        component={ClientsListing}
      />
      <Bottom.Screen
        name={MAIN_BOTTOM_ROUTES.SETTINGS}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color, size }: any) => (
            <Ionicons
              name="settings"
              size={size ? size : 24}
              color={focused ? color : primaryTheme}
              focused={focused}
            />
          ),
        }}
        component={Settings}
      />
    </Bottom.Navigator>
  );
};
