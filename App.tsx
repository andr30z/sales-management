import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MainBottom } from "./src/Routes/MainBottom";
/**
 *
 * @author andr30z
 **/
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <MainBottom />
      </ApplicationProvider>
    </GestureHandlerRootView>
  );
}
