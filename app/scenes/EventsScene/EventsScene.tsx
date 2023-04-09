import React from "react";
import { Grid, Slider } from "@mui/joy";
import { Moment } from "moment";
import Input from "../../components/v2/Input";
import DateRangePicker from "../../components/v2/DateRangePicker";
import SliderRange from "../../components/v2/SliderRange";

type Props = {};

const EventsScene = (props: Props) => {
  const [selectedDates, setDates] = React.useState<
    [Moment | null, Moment | null]
  >([null, null]);
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 10000]);
  return (
    <Grid container spacing={2} sx={{ paddingLeft: "20px" }}>
      <Grid xs={2} container>
        <Grid xs={12}>
          <Input onChange={() => {}} value="" label="City" />
        </Grid>
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
        <Grid xs={12}>
          <SliderRange
            getAriaLabel={() => "Price range"}
            value={priceRange}
            onChange={(value) => setPriceRange(value)}
            max={10000}
            min={0}
            valueLabelDisplay="auto"
            size="lg"
            label="Price range"
          />
        </Grid>
        <Grid xs={6}>
          <Input
            type="number"
            value={priceRange[0]}
            onChange={(value) =>
              setPriceRange([parseInt(value, 10), priceRange[1]])
            }
            label="Min Price"
          />
        </Grid>
        <Grid xs={6}>
          <Input
            type="number"
            value={priceRange[1]}
            onChange={(value) =>
              setPriceRange([priceRange[0], parseInt(value, 10)])
            }
            label="Max Price"
          />
        </Grid>
      </Grid>
      <Grid xs={9}>{/* alksdfjaksldj */}</Grid>
    </Grid>
  );
};

export default React.memo(EventsScene);
