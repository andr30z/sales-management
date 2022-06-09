import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { ClientsListing } from "../../Screens/ClientsListing";
import { SalesListing } from "../../Screens/SalesListing";
import { Settings } from "../../Screens/Settings";
import { MainBottomRoutesTypes, MAIN_BOTTOM_ROUTES } from "./Types";

const Bottom = AnimatedTabBarNavigator<MainBottomRoutesTypes>();
export const MainBottom: React.FC = () => {
  const theme = useTheme();
  const primaryTheme = theme["color-primary-default"];
  return (
    <Bottom.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBarOptions={{
        activeTintColor: "#fff",
        activeBackgroundColor: primaryTheme,
        inactiveTintColor: "#fff",
      }}
      appearance={undefined as any}
    >
      <Bottom.Screen
        name={MAIN_BOTTOM_ROUTES.SALES_LISTING}
        options={{
          tabBarLabel: ({ focused, color }: any) => (
            <Text category={focused ? "p1" : "p2"} style={{ color }}>
              Vendas
            </Text>
          ),
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
          tabBarLabel: ({ focused, color }: any) => (
            <Text category={focused ? "p1" : "p2"} style={{ color }}>
              Clientes
            </Text>
          ),
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
          tabBarLabel: ({ focused, color }: any) => (
            <Text category={focused ? "p1" : "p2"} style={{ color }}>
              Configurações
            </Text>
          ),
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
