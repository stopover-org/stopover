import React from "react";
import { Grid } from "@mui/joy";
import {} from "../../pages/events/__generated__/events_Query.graphql";
import Input from "../../components/v2/Input";
import DatePicker from "../../components/v2/DatePicker";

type Props = {};

const EventsScene = ({}: Props) => {
  const startDateRef = React.useRef<HTMLInputElement | null>(null);
  const endDateRef = React.useRef<HTMLInputElement | null>(null);
  const [openedDatePicker, setOpenedDatePicker] = React.useState<number | null>(
    null
  );

  console.log(startDateRef, endDateRef);
  return (
    <Grid container>
      <Grid spacing={1} xs={3} container>
        <Grid xs={12}>
          <Input onChange={() => {}} value="" label="City" />
        </Grid>
        <Grid xs={6}>
          <DatePicker
            inputRef={startDateRef}
            disablePast
            slotProps={{
              field: {
                placeholder: "Start date",
              },
            }}
            label="Start"
            hint="Start of your trip"
          />
        </Grid>
        <Grid xs={6}>
          <DatePicker
            inputRef={endDateRef}
            disablePast
            slotProps={{
              field: {
                placeholder: "End date",
              },
            }}
            label="End"
            hint="End of your trip"
          />
        </Grid>
      </Grid>
      <Grid xs={9}>{/* alksdfjaksldj */}</Grid>
    </Grid>
  );
};

export default React.memo(EventsScene);
