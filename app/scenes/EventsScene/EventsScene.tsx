import React from "react";
import { Grid } from "@mui/joy";
import { Moment } from "moment";
import Input from "../../components/v2/Input";
import DateRangePicker from "../../components/v2/DateRangePicker";

type Props = {};

const EventsScene = (props: Props) => {
  const [selectedDates, setDates] = React.useState<
    [Moment | null, Moment | null]
  >([null, null]);
  return (
    <Grid container>
      <Grid spacing={1} xs={3} container>
        <Grid xs={12}>
          <Input onChange={() => {}} value="" label="City" />
        </Grid>
        <Grid xs={12}>
          <DateRangePicker
            value={selectedDates}
            onChange={(dates) => setDates(dates)}
            startInputProps={{
              label: "Start Date",
              placeholder: "Enter Start of your trip",
              hint: "Enter Start of your trip",
            }}
            endInputProps={{
              label: "End Date",
              placeholder: "Enter End of your trip",
              hint: "Enter End of your trip",
            }}
          />
        </Grid>
      </Grid>
      <Grid xs={9}>{/* alksdfjaksldj */}</Grid>
    </Grid>
  );
};

export default React.memo(EventsScene);
