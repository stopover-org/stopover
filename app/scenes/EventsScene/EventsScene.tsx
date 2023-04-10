import React from "react";
import { Grid, Slider, useTheme } from "@mui/joy";
import { Moment } from "moment";
import { useMediaQuery } from "@mui/material";
import Input from "../../components/v2/Input";
import DateRangePicker from "../../components/v2/DateRangePicker";
import SliderRange from "../../components/v2/SliderRange";
import Checkbox from "../../components/v2/Checkbox";
import RatingSelector from "../../components/v2/RatingSelector";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";

type Props = {};

const EventsScene = () => {
  const theme = useTheme();
  const showSidebar = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingLeft: "20px", paddingRight: "20px" }}
    >
      {showSidebar && (
        <Grid xs={2} container sx={{ maxWidth: "250px", minWidth: "250px" }}>
          <Sidebar />
        </Grid>
      )}
      <Grid
        md={9}
        sm={12}
        container
        sx={{
          paddingTop: showSidebar ? "7px" : "20px",
          paddingLeft: showSidebar ? "60px" : "0",
          minWidth: "calc(100vw - 250px)",
        }}
      >
        <Grid md={9} sm={12}>
          <SearchBar />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(EventsScene);
