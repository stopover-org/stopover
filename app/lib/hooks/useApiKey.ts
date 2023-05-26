import React from "react";
import { ApiKeysContext } from "../../components/ApiKeysProvider";

export function useApiKey(apiKey: string) {
  const { apiKeys } = React.useContext(ApiKeysContext);
  return React.useMemo(() => {
    if (Object.keys(apiKeys).includes(apiKey)) {
      return apiKeys[apiKey];
    }
    return null;
  }, [apiKeys, apiKey]);
}
