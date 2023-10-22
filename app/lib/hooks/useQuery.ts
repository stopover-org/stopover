import React from "react";
import { QueryContext } from "../../components/QueryProvider";

export function useQuery(key?: string, defaultValue?: any) {
  const { query, setKey } = React.useContext(QueryContext);
  React.useEffect(() => {
    if (defaultValue && key) {
      setKey(key, defaultValue);
    }
  }, []);

  return React.useMemo(() => {
    if (key) {
      if (Object.keys(query).includes(key)) {
        return query[key] || defaultValue;
      }
      return defaultValue;
    }
    return query;
  }, [query, key]);
}

export function useUpdateQuery(key: string, defaultValue?: any) {
  const { setKey, deleteKey, query } = React.useContext(QueryContext);
  return React.useCallback(
    (value: any) => {
      if (value) {
        setKey(key, value || defaultValue);
      } else {
        console.log(key);

        deleteKey(key);
      }
    },
    [key, setKey, query]
  );
}
