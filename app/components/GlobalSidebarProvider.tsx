import React from "react";

export const GlobalSidebarContext = React.createContext<{
  opened: boolean;
  close: () => void;
  open: () => void;
}>({
  opened: false,
  open: () => {},
  close: () => {},
});

interface GlobalSidebarProviderProps {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[];
}

const GlobalSidebarProvider = ({ children }: GlobalSidebarProviderProps) => {
  const [opened, setOpened] = React.useState<boolean>(false);
  const value = React.useMemo(
    () => ({
      opened,
      close: () => setOpened(false),
      open: () => setOpened(true),
    }),
    [opened, setOpened]
  );
  return (
    <GlobalSidebarContext.Provider value={value}>
      {children}
    </GlobalSidebarContext.Provider>
  );
};

export default GlobalSidebarProvider;
