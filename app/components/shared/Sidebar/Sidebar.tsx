import { Grid, ListItem, ListItemButton, useTheme } from "@mui/joy";
import List from "@mui/joy/List";
import React from "react";
import { useMediaQuery } from "@mui/material";
import Link from "../../v2/Link";

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
            <Link level="h6" href={item.href} underline={false}>
              <ListItem key={item.href}>
                <ListItemButton color="primary" href={item.href}>
                  {item.title}
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Grid>
    </Grid>
  ) : null;
};

export default React.memo(Sidebar);
