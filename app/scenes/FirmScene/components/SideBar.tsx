import { Grid, ListItem, ListItemButton } from "@mui/joy";
import List from "@mui/joy/List";

import React from "react";

const Sidebar = () => (
  <Grid
    flexDirection="column"
    sx={{ maxWidth: 250, width: "100%", minWidth: 0 }}
  >
    <Grid xs={12}>
      <List>
        <ListItem>
          <ListItemButton color="primary" href="#home/trips">
            Trips
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton color="primary" href="#home/events">
            Events
          </ListItemButton>
        </ListItem>
      </List>
    </Grid>
  </Grid>
);

export default React.memo(Sidebar);
