import { Grid, ListItem, ListItemButton, useTheme } from "@mui/joy";
import List from "@mui/joy/List";
import React from "react";
import { useMediaQuery } from "@mui/material";

interface SidebarItem {
  title: string;
  href: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

const Sidebar = ({ items }: SidebarProps) => {
  const theme = useTheme();
  const showSidebar = useMediaQuery(theme.breakpoints.up("md"));
  return showSidebar ? (
    <Grid
      flexDirection="column"
      sx={{ maxWidth: 250, width: "100%", minWidth: 0 }}
    >
      <Grid xs={12}>
        <List>
          {items.map((item) => (
            <ListItem>
              <ListItemButton key={item.href} color="primary" href={item.href}>
                {item.title}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  ) : null;
};

export default React.memo(Sidebar);
