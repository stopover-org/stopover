import React from "react";
import { ApiKeysContext, IApiKeys } from "../../components/ApiKeysProvider";

export function useUpdateApiKeys(apiKeys: IApiKeys) {
  const { setApiKeys, apiKeys: originApiKeys } =
    React.useContext(ApiKeysContext);

  console.log(originApiKeys);

  return React.useEffect(() => {
    if (Object.keys(originApiKeys).length === 0) {
      setApiKeys(apiKeys);
    }
  }, []);
}
