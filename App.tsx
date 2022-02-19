import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { SalesInfo } from "./src/Context/SalesInfo";
import { MainBottom } from "./src/Routes/MainBottom";
import { default as theme } from "./theme.json";
/**
 *
 * @author andr30z
 **/
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <SalesInfo>
          <SafeAreaView style={{ flex: 1 }}>
            <MainBottom />
          </SafeAreaView>
        </SalesInfo>
      </ApplicationProvider>
    </GestureHandlerRootView>
  );
}
