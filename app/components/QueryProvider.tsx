import React from "react";

export interface IQueryContext extends Record<string, any> {}

export const QueryContext = React.createContext<{
  query: IQueryContext;
  setKey: (key: string, value: any) => void;
  deleteKey: (key: string) => void;
}>({
  query: {},
  setKey: () => {},
  deleteKey: () => {},
});

interface QueryProviderProps {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[];
}

const QueryProvider = ({ children }: QueryProviderProps) => {
  const [query, setQuery] = React.useState<IQueryContext>({});
  const setKey = React.useCallback(
    (key: string, value: any) => {
      setQuery({ ...query, [key]: value });
    },
    [query, setQuery]
  );

  const deleteKey = React.useCallback(
    (key: string) => {
      if (query[key]) {
        const q = { ...query };
        delete q[key];

        setQuery(q);
      }
    },
    [query, setQuery]
  );

  const value = React.useMemo(
    () => ({
      query,
      setKey,
      deleteKey,
    }),
    [query, setQuery, setKey]
  );

  return (
    <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
  );
};

export default QueryProvider;
