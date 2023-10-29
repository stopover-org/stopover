import { Grid, styled, useTheme } from "@mui/joy";
import React from "react";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import Sidebar from "../Sidebar/Sidebar";
import { GlobalSidebarContext } from "../../GlobalSidebarProvider";
import SelectCurrentFirm from "../SelectCurrentFirm";
import { SidebarContent_AccountFragment$key } from "../../../artifacts/SidebarContent_AccountFragment.graphql";

const ContentWrapper = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    maxWidth: "calc(100vw - 310px)",
  },
}));

interface SidebarContentProps {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[];
  sx?: any;
  accountFragmentRef: SidebarContent_AccountFragment$key;
}

const SidebarContent = ({
  children,
  sx,
  accountFragmentRef,
}: SidebarContentProps) => {
  const account = useFragment(
    graphql`
      fragment SidebarContent_AccountFragment on Account {
        ...SelectCurrentFirm_AccountFragment
        user {
          serviceUser
        }
      }
    `,
    accountFragmentRef
  );
  const theme = useTheme();
  const showSidebar = useMediaQuery(theme.breakpoints.up("md"));
  const { setContent } = React.useContext(GlobalSidebarContext);
  const { t } = useTranslation();
  const items = React.useMemo(() => {
    const array = account.user.serviceUser
      ? [{ slot: <SelectCurrentFirm accountFragmentRef={account} /> }]
      : [];
    return [
      ...array,
      { title: t("layout.header.myFirm"), href: "/my-firm/dashboard" },
      {
        title: t("layout.header.addNewEvent"),
        href: "/my-firm/events/new",
      },
      { title: t("models.event.plural"), href: "/my-firm/events" },
      { title: t("models.booking.plural"), href: "/my-firm/bookings" },
      {
        title: t("models.schedule.plural"),
        href: "/my-firm/schedules",
      },
    ];
  }, [account]);

  React.useEffect(() => {
    setContent(<Sidebar items={items} />);
  }, [t]);
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

export default React.memo(SidebarContent);
