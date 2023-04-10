import { Grid } from "@mui/joy";
import React from "react";
import { Moment } from "moment/moment";
import Input from "../../../components/v2/Input/Input";
import DateRangePicker from "../../../components/v2/DateRangePicker/DateRangePicker";
import SliderRange from "../../../components/v2/SliderRange/SliderRange";
import Checkbox from "../../../components/v2/Checkbox/Checkbox";

const Sidebar = () => {
  const [selectedDates, setDates] = React.useState<
    [Moment | null, Moment | null]
  >([null, null]);
  const [rating, setRating] = React.useState(5);
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 10000]);
  const [onlyIndividual, setOnlyIndividual] = React.useState(false);
  return (
    <>
      <Grid xs={12}>
        <Input onChange={() => {}} value="" label="City" />
      </Grid>
      <DateRangePicker
        value={selectedDates}
        onChange={(dates) => setDates(dates)}
        startInputProps={{
          label: "Start Date",
          placeholder: "Enter Start of your trip",
          hint: "Start of your trip",
        }}
        endInputProps={{
          label: "End Date",
          placeholder: "Enter End of your trip",
          hint: "End of your trip",
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
          value={priceRange[0].toString()}
          onChange={(value) => {
            let newValue = parseInt(value, 10);
            if (Number.isNaN(newValue)) newValue = 0;
            setPriceRange([newValue, priceRange[1]]);
          }}
          label="Min Price"
        />
      </Grid>
      <Grid xs={6}>
        <Input
          type="number"
          value={priceRange[1].toString()}
          onChange={(value) => {
            let newValue = parseInt(value, 10);
            if (Number.isNaN(newValue)) newValue = 0;
            setPriceRange([priceRange[0], newValue]);
          }}
          label="Max Price"
        />
      </Grid>
      <Grid xs={12}>
        <Checkbox
          onChange={() => setOnlyIndividual(!onlyIndividual)}
          checked={onlyIndividual}
          label="Only Individual Events"
        />
      </Grid>
      <Grid xs={12}>
        <RatingSelector onSelect={setRating} rating={rating} />
      </Grid>
    </>
  );
};

export default React.memo(Sidebar);