import React, {
    createContext,
    useContext
} from "react";
interface SalesInfoContextInterface {
}

const SalesInfoContext = createContext<SalesInfoContextInterface>(
  {} as SalesInfoContextInterface
);

export const SalesInfo: React.FC = ({ children }) => {
  return (
    <SalesInfoContext.Provider
      value={{
      
      }}
    >
      {children}
    </SalesInfoContext.Provider>
  );
};

export function useSalesInfoContext() {
  return useContext(SalesInfoContext);
}
