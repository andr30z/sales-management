import { ApplicationProvider } from "@ui-kitten/components";
import React from "react";
import { default as theme } from "../../theme.json";
import * as eva from "@eva-design/eva";
export const EvaApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      {children}
    </ApplicationProvider>
  );
};
