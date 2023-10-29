import { Grid, ListItem, ListItemButton } from "@mui/joy";
import List from "@mui/joy/List";
import React from "react";
import * as uuid from "uuid";
import Link from "../../v2/Link";

interface SidebarItem {
  title?: string;
  href?: string;
  key?: string;
  slot?: any;
}

interface SidebarProps {
  items: SidebarItem[];
}

const Sidebar = ({ items }: SidebarProps) => (
  <Grid flexDirection="column">
    <Grid xs={12}>
      <List sx={{ maxWidth: "250px", minWidth: "250px" }}>
        {items.map((item) =>
          item.href ? (
            <Link
              level="body-md"
              href={item.href}
              underline={false}
              key={`item-${item.href}`}
            >
              <ListItem>
                <ListItemButton color="primary" href={item.href}>
                  {item.title}
                </ListItemButton>
              </ListItem>
            </Link>
          ) : (
            <ListItem sx={{ marginLeft: "-15px" }} key={item.key || uuid.v4()}>
              {item.slot}
            </ListItem>
          )
        )}
      </List>
    </Grid>
  </Grid>
);

export default React.memo(Sidebar);
