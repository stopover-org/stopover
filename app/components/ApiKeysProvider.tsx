import React from "react";

export interface IApiKeys {
  [key: string]: string;
}
export const ApiKeysContext = React.createContext<{
  apiKeys: IApiKeys;
}>({
  apiKeys: {},
});

interface ApiKeysProviderProps {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[];
  apiKeys: IApiKeys;
}

const ApiKeysProvider = ({ children, apiKeys }: ApiKeysProviderProps) => {
  const value = React.useMemo(
    () => ({
      apiKeys,
    }),
    [apiKeys]
  );
  return (
    <ApiKeysContext.Provider value={value}>{children}</ApiKeysContext.Provider>
  );
};

export default ApiKeysProvider;
