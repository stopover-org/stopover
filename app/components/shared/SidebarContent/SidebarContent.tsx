import { Drawer, Grid, styled, useTheme } from "@mui/joy";
import React from "react";
import { useMediaQuery } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import { GlobalSidebarContext } from "../../GlobalSidebarProvider";

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
}

const SidebarContent = ({ children, sx }: SidebarContentProps) => {
  const theme = useTheme();
  const showSidebar = useMediaQuery(theme.breakpoints.up("md"));
  const { opened, close } = React.useContext(GlobalSidebarContext);
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ paddingLeft: "20px", paddingRight: "20px" }}
      >
        {showSidebar && (
          <Sidebar
            items={[
              { title: "My Firm", href: "/my-firm/dashboard" },
              { title: "Add New Event", href: "/my-firm/events/new" },
              { title: "Events", href: "/my-firm/events" },
              { title: "Bookings", href: "/my-firm/bookings" },
              { title: "Schedules", href: "/my-firm/schedules" },
            ]}
          />
        )}
        <ContentWrapper
          container
          sx={{
            paddingTop: showSidebar ? "7px" : "20px",
            minWidth: "calc(100wv - 250px)",
            ...sx,
          }}
        >
          {children}
        </ContentWrapper>
      </Grid>
      <Drawer open={opened} onClose={close}>
        <Grid container padding="10px">
          <Sidebar
            items={[
              { title: "My Firm", href: "/my-firm/dashboard" },
              { title: "Add New Event", href: "/my-firm/events/new" },
              { title: "Events", href: "/my-firm/events" },
              { title: "Bookings", href: "/my-firm/bookings" },
              { title: "Schedules", href: "/my-firm/schedules" },
            ]}
          />
        </Grid>
      </Drawer>
    </>
  );
};

export default React.memo(SidebarContent);
