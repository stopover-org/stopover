import React from "react";
import { Grid, Slider } from "@mui/joy";
import { Moment } from "moment";
import Input from "../../components/v2/Input";
import DateRangePicker from "../../components/v2/DateRangePicker";
import SliderRange from "../../components/v2/SliderRange";
import Checkbox from "../../components/v2/Checkbox";
import RatingSelector from "../../components/v2/RatingSelector";
import Sidebar from "./components/Sidebar";

type Props = {};

const EventsScene = (props: Props) => (
  <Grid container spacing={2} sx={{ paddingLeft: "20px" }}>
    <Grid xs={2} container sx={{ maxWidth: "250px", minWidth: "250px" }}>
      <Sidebar />
    </Grid>
    <Grid xs={9}>{/* alksdfjaksldj */}</Grid>
  </Grid>
);

export default React.memo(EventsScene);
