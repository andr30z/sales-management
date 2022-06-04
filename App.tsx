import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";
import { SalesInfo } from "./src/Context/SalesInfo";
import { MainStack } from "./src/Routes/MainStack";
import { default as theme } from "./theme.json";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Halant_400Regular, Halant_700Bold } from "@expo-google-fonts/halant";
import { Satisfy_400Regular } from "@expo-google-fonts/satisfy";
import * as montserrat from "@expo-google-fonts/montserrat";
import { StatusBar } from "expo-status-bar";
import { PortalHost, PortalProvider } from "@gorhom/portal";
import { PortalLocations } from "./src/PortalLocations";
import Toast from "react-native-toast-notifications";

const { useFonts: _, __metadata__, ...rest } = montserrat;
SplashScreen.preventAutoHideAsync();
/**
 *
 * @author andr30z
 **/
export default function App() {
  const [fontsLoaded] = useFonts({
    Halant_400Regular,
    Halant_700Bold,
    Satisfy_400Regular,
    ...rest,
  });
  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);
  if (!fontsLoaded)
    return (
      <>
        <StatusBar translucent />
      </>
    );
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <ToastProvider>
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
            <SalesInfo>
              <SafeAreaView style={{ flex: 1 }}>
                <MainStack />
                <PortalHost name={PortalLocations.ROOT} />
              </SafeAreaView>
            </SalesInfo>
          </ApplicationProvider>
          <Toast ref={(ref) => ((global as any)["toast"] = ref)} />
        </ToastProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}
