import { Grid, styled, useTheme } from "@mui/joy";
import React from "react";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import Sidebar from "../Sidebar/Sidebar";
import { GlobalSidebarContext } from "../../GlobalSidebarProvider";

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
}

const AttendeeSidebar = ({ children, sx }: AttendeeSidebarProps) => {
  const theme = useTheme();
  const showSidebar = useMediaQuery(theme.breakpoints.up("md"));
  const { setContent } = React.useContext(GlobalSidebarContext);
  const { t } = useTranslation();
  const items = React.useMemo(
    () => [
      { title: "Настройки Профиля", href: "/profile" },
      { title: "Путешествия", href: "/trips" },
    ],
    []
  );

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

export default React.memo(AttendeeSidebar);
