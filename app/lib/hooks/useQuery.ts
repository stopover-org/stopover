import React from "react";
import { useRouter } from "next/navigation";
import { QueryContext } from "../../components/QueryProvider";

export function useQuery(key?: string, defaultValue?: any) {
  const router = useRouter();
  const { query, setKey } = React.useContext(QueryContext);
  React.useEffect(() => {
    if (defaultValue && key) {
      const isArray = Array.isArray(defaultValue);
      const routerValue =
        !Array.isArray(router.query[key]) && isArray
          ? [router.query[key]].filter(Boolean)
          : router.query[key];

      setKey(key, routerValue || defaultValue);
    }
  }, []);

  return React.useMemo(() => {
    if (key) {
      if (Object.keys(query).includes(key)) {
        return query[key];
      }
      return defaultValue;
    }
    return query;
  }, [query, key]);
}

export function useUpdateQuery(key: string) {
  const { setKey, deleteKey, query } = React.useContext(QueryContext);
  return React.useCallback(
    (value: any) => {
      if (value) {
        setKey(key, value);
      } else {
        deleteKey(key);
      }
    },
    [key, setKey, query]
  );
}
