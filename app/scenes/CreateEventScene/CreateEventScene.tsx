import { AspectRatio, Box, Grid, styled, useTheme } from "@mui/joy";
import React from "react";
import { useMediaQuery } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Typography from "../../components/v2/Typography";
import Input from "../../components/v2/Input";
import SideBar from "../FirmScene/components/SideBar";

const ContentWrapper = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    maxWidth: "calc(100vw - 260px)",
  },
}));

const CreateEventScene = () => {
  const theme = useTheme();
  const showSidebar = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingLeft: "20px", paddingRight: "20px" }}
    >
      {showSidebar && (
        <Grid xs={4} container width="250px">
          <SideBar />
        </Grid>
      )}

      <ContentWrapper
        md={10}
        sm={12}
        container
        sx={{
          paddingTop: showSidebar ? "7px" : "20px",
          paddingLeft: showSidebar ? "60px" : "0",
          minWidth: "calc(100wv - 250px)",
        }}
      >
        <Grid>
          <Typography level="h3">Event Title</Typography>
        </Grid>
        <Grid md={6} sm={12}>
          <Input label="title" />
        </Grid>

        <Grid xs={12}>
          <AspectRatio
            variant="outlined"
            ratio="4/3"
            sx={{
              width: 300,
              bgcolor: "background.level2",
              borderRadius: "md",
              position: "relative",
            }}
          >
            <img alt="Logo Preview" />

            <Box
              sx={{
                position: "absolute",
                zIndex: 2,
                right: "1rem",
                top: "1rem",
                borderRadius: "50%",
                backgroundColor: "white",
                width: "30px",
                height: "30px",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              <ClearIcon sx={{ color: "black" }} />
            </Box>
          </AspectRatio>
        </Grid>

        <Grid md={6} sm={12}>
          <Input label="Description" />
        </Grid>
        <Grid md={6} sm={12}>
          <Input label="House Number" />
        </Grid>
        <Grid md={6} sm={12}>
          <Input label="Street" />
        </Grid>
        <Grid md={6} sm={12}>
          <Input label="City" />
        </Grid>
        <Grid md={6} sm={12}>
          <Input label="Country" />
        </Grid>
        <Grid md={6} sm={12}>
          <Input label="Region" />
        </Grid>
        <Grid md={6} sm={12}>
          <Input label="Full Address" />
        </Grid>
      </ContentWrapper>
    </Grid>
  );
};

export default React.memo(CreateEventScene);
