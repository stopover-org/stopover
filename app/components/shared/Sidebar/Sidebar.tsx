import { Box, Grid, ListItem, ListItemButton } from "@mui/joy";
import List from "@mui/joy/List";
import React from "react";
import * as uuid from "uuid";
import LaunchIcon from "@mui/icons-material/Launch";
import Link from "components/v2/Link";
import Typography from "components/v2/Typography";
import { useTranslation } from "react-i18next";

interface SidebarItem {
  title?: string;
  blank?: boolean;
  href?: string;
  key?: string;
  slot?: any;
  serviceUser?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
}

const Sidebar = ({ items }: SidebarProps) => {
  const { t } = useTranslation();
  return (
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
                component="div"
                target={item.blank ? "_blank" : undefined}
                icon={false}
              >
                <ListItem sx={{ display: "inline-block" }}>
                  <ListItemButton color="primary">
                    <Box sx={{ width: "100%" }}>
                      {item.title}
                      {item.blank && (
                        <>
                          &nbsp;
                          <LaunchIcon sx={{ fontSize: ".9em" }} />
                        </>
                      )}
                      {item.serviceUser && (
                        <>
                          <br />
                          <Typography
                            variant="soft"
                            fontSize="10px"
                            sx={{ padding: 0, margin: 0 }}
                          >
                            {t("models.user.attributes.serviceUser")}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </ListItemButton>
                </ListItem>
              </Link>
            ) : (
              <ListItem
                sx={{ marginLeft: "-15px" }}
                key={item.key || uuid.v4()}
              >
                {item.slot}
              </ListItem>
            )
          )}
        </List>
      </Grid>
    </Grid>
  );
};

export default React.memo(Sidebar);
