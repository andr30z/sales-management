import React from "react";
import Toast, { ToastProvider } from "react-native-toast-notifications";


export const MockedToastProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <ToastProvider>
      {children}
      <Toast ref={(ref) => ((global as any)["toast"] = ref)} />
    </ToastProvider>
  );
};
