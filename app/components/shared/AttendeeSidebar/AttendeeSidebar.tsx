import { Grid, styled, useTheme } from "@mui/joy";
import React from "react";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import Sidebar from "../Sidebar/Sidebar";
import { GlobalSidebarContext } from "../../GlobalSidebarProvider";
import { AttendeeSidebar_CurrentUserFragment$key } from "../../../artifacts/AttendeeSidebar_CurrentUserFragment.graphql";

const ContentWrapper = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    maxWidth: "calc(100vw - 310px)",
  },
}));

interface AttendeeSidebarProps {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[];
  sx?: any;
  currentUserFragmentRef: AttendeeSidebar_CurrentUserFragment$key;
}

const AttendeeSidebar = ({
  children,
  sx,
  currentUserFragmentRef,
}: AttendeeSidebarProps) => {
  const currentUser = useFragment(
    graphql`
      fragment AttendeeSidebar_CurrentUserFragment on User {
        status
        account {
          id
        }
      }
    `,
    currentUserFragmentRef
  );
  const theme = useTheme();
  const showSidebar = useMediaQuery(theme.breakpoints.up("md"));
  const { setContent } = React.useContext(GlobalSidebarContext);
  const { t } = useTranslation();
  const items = React.useMemo(() => {
    const menuItems = [];
    if (currentUser.status === "active")
      menuItems.push({ title: t("layout.header.myProfile"), href: "/profile" });
    menuItems.push({ title: t("layout.header.myTrips"), href: "/trips" });
    return menuItems;
  }, [t, currentUser]);

  React.useEffect(() => {
    setContent(<Sidebar items={items} />);
  }, [items, setContent]);

  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingLeft: "20px", paddingRight: "20px" }}
    >
      {showSidebar && <Sidebar items={items} />}
      <ContentWrapper
        container
        sx={{
          paddingTop: showSidebar ? "7px" : "20px",
          minWidth: "calc(100wv - 250px)",
          ...sx,
        }}
      >
        <Grid xs={12}>{children}</Grid>
      </ContentWrapper>
    </Grid>
  );
};

export default React.memo(AttendeeSidebar);
