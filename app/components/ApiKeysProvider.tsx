import React from "react";
import { fetchEnvVariables } from "../lib/fetchEnvVariables";

export interface IApiKeys extends Record<string, string> {}

export const ApiKeysContext = React.createContext<{
  apiKeys: IApiKeys;
  setApiKeys: (apiKeys: IApiKeys) => void;
}>({
  apiKeys: {},
  setApiKeys: () => {},
});

interface ApiKeysProviderProps {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[];
}

const ApiKeysProvider = ({ children }: ApiKeysProviderProps) => {
  const [apiKeys, setApiKeys] = React.useState<IApiKeys>(fetchEnvVariables());
  const value = React.useMemo(
    () => ({
      apiKeys,
      setApiKeys,
    }),
    [apiKeys, setApiKeys]
  );
  return (
    <ApiKeysContext.Provider value={value}>{children}</ApiKeysContext.Provider>
  );
};

export default ApiKeysProvider;
