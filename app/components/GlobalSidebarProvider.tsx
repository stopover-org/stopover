import { Drawer } from "@mui/joy";
import React from "react";

export const GlobalSidebarContext = React.createContext<{
  opened: boolean;
  close: () => void;
  open: () => void;
  content:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[];
  setContent: (
    value:
      | React.ReactElement
      | React.ReactElement[]
      | React.ReactNode
      | React.ReactNode[]
  ) => void;
}>({
  opened: false,
  open: () => {},
  close: () => {},
  setContent: () => {},
  content: null,
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
  const [content, setContent] = React.useState<
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[]
  >(null);

  const value = React.useMemo(
    () => ({
      opened,
      close: () => setOpened(false),
      open: () => setOpened(true),
      setContent,
      content,
    }),
    [opened, setOpened, content, setContent]
  );
  return (
    <GlobalSidebarContext.Provider value={value}>
      {children}
      {content && (
        <Drawer open={opened} onClose={value.close}>
          {content}
        </Drawer>
      )}
    </GlobalSidebarContext.Provider>
  );
};

export default GlobalSidebarProvider;
