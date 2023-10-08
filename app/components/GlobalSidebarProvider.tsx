import { Box, Drawer, Grid } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import Link from "./v2/Link";
import { GlobalSidebarProvider_FirmFragment$key } from "../artifacts/GlobalSidebarProvider_FirmFragment.graphql";

export const GlobalSidebarContext = React.createContext<{
  opened: boolean;
  close: () => void;
  open: () => void;
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
});

interface GlobalSidebarProviderProps {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[];
  firmFragmentRef: GlobalSidebarProvider_FirmFragment$key;
}

const GlobalSidebarProvider = ({
  children,
  firmFragmentRef,
}: GlobalSidebarProviderProps) => {
  const [opened, setOpened] = React.useState<boolean>(false);
  const [content, setContent] = React.useState<
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[]
  >(null);

  const firm = useFragment<GlobalSidebarProvider_FirmFragment$key>(
    graphql`
      fragment GlobalSidebarProvider_FirmFragment on Firm {
        id
      }
    `,
    firmFragmentRef
  );

  const value = React.useMemo(
    () => ({
      opened,
      close: () => setOpened(false),
      open: () => setOpened(true),
      setContent,
    }),
    [opened, setOpened, content, setContent]
  );
  const { t } = useTranslation();
  return (
    <GlobalSidebarContext.Provider value={value}>
      {children}
      <Drawer open={opened} onClose={value.close}>
        {content}
        {!firm && (
          <Grid xs={12}>
            <Box
              sx={{
                display: "flex",
                position: "sticky",
                bottom: "0",
                gap: 1,
                p: 1.5,
                pb: 2,
                width: "90%",
              }}
            >
              <Link href="/firms/new">{t("layout.header.registerFirm")}</Link>
            </Box>
          </Grid>
        )}
        <Grid xs={12}>
          <Box
            sx={{
              display: "flex",
              position: "sticky",
              bottom: "0",
              gap: 1,
              p: 1.5,
              pb: 2,
              width: "90%",
            }}
          >
            <Link href="/trips">{t("layout.header.myTrips")}</Link>
          </Box>
        </Grid>
      </Drawer>
    </GlobalSidebarContext.Provider>
  );
};

export default GlobalSidebarProvider;
