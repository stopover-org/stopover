import { Grid, styled, useTheme } from "@mui/joy";
import React from "react";
import { useMediaQuery } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";

const ContentWrapper = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    maxWidth: "calc(100vw - 260px)",
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
  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingLeft: "20px", paddingRight: "20px" }}
    >
      <Sidebar
        items={[
          { title: "My Firm", href: "/my-firm" },
          { title: "Add New Event", href: "/my-firm/events/new" },
          { title: "Dashboard", href: "/my-firm/dashboard" },
        ]}
      />
      <ContentWrapper
        md={10}
        sm={12}
        container
        sx={{
          paddingTop: showSidebar ? "7px" : "20px",
          paddingLeft: showSidebar ? "60px" : "0",
          minWidth: "calc(100wv - 250px)",
          ...sx,
        }}
      >
        {children}
      </ContentWrapper>
    </Grid>
  );
};

export default React.memo(SidebarContent);
