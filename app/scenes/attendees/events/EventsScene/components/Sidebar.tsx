import { Grid } from "@mui/joy";
import React from "react";
import { Moment } from "moment/moment";
import { Edit as EditIcon } from "@mui/icons-material";
import { graphql, RefetchFn, useFragment } from "react-relay";
import { useDebounce } from "use-debounce";
import Input from "../../../../../components/v2/Input/Input";
import DateRangePicker from "../../../../../components/v2/DateRangePicker/DateRangePicker";
import SliderRange from "../../../../../components/v2/SliderRange/SliderRange";
import Checkbox from "../../../../../components/v2/Checkbox/Checkbox";
import RatingSelector from "../../../../../components/v2/RatingSelector";
import { Sidebar_EventFiltersFragment$key } from "../../../../../artifacts/Sidebar_EventFiltersFragment.graphql";

interface Props {
  eventFiltersFragment: Sidebar_EventFiltersFragment$key;
  refetch: RefetchFn<any>;
}

const Sidebar = ({ eventFiltersFragment, refetch }: Props) => {
  const edgeFiltersValues = useFragment(
    graphql`
      fragment Sidebar_EventFiltersFragment on EventFilters {
        startDate
        endDate
        minPrice {
          cents
        }
        maxPrice {
          cents
        }
      }
    `,
    eventFiltersFragment
  );
  const ref = React.useRef<NodeJS.Timeout | null>(null);
  const [selectedDates, setDates] = React.useState<
    [Moment | null, Moment | null]
  >([null, null]);
  const [rating, setRating] = React.useState(0);
  const [priceRange, setPriceRange] = React.useState<number[]>([
    edgeFiltersValues.minPrice.cents,
    edgeFiltersValues.maxPrice.cents,
  ]);
  const [onlyIndividual, setOnlyIndividual] = React.useState(false);
  const [city, setCity] = React.useState("");
  const filters = React.useMemo(
    () => ({
      filters: {
        startDate: selectedDates[0]?.toDate(),
        endDate: selectedDates[1]?.toDate(),
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        city,
      },
    }),
    [selectedDates, priceRange, city]
  );

  React.useEffect(() => {
    if (ref.current) {
      clearTimeout(ref.current);

      ref.current = null;
    }
    ref.current = setTimeout(() => {
      refetch(filters);

      ref.current = null;
    }, 1000);
  }, [filters, refetch, ref]);

  return (
    <Grid container flexDirection="column">
      <Grid xs={12}>
        <Input
          onChange={(value) => setCity(value)}
          value={city}
          label="City"
          endDecorator={<EditIcon />}
        />
      </Grid>
      <DateRangePicker
        value={selectedDates}
        onChange={(dates) => setDates(dates)}
        minDate={edgeFiltersValues.startDate}
        disablePast
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
          max={edgeFiltersValues.maxPrice.cents}
          min={edgeFiltersValues.minPrice.cents}
          valueLabelDisplay="auto"
          size="lg"
          label="Price range"
        />
      </Grid>
      <Grid xs={12} container>
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
      </Grid>
      {/* <Grid xs={12}> */}
      {/*  <Checkbox */}
      {/*    onChange={() => setOnlyIndividual(!onlyIndividual)} */}
      {/*    checked={onlyIndividual} */}
      {/*    label="Only Individual Events" */}
      {/*  /> */}
      {/* </Grid> */}
      {/* <Grid xs={12}> */}
      {/*  <RatingSelector onSelect={setRating} rating={rating} /> */}
      {/* </Grid> */}
    </Grid>
  );
};

export default React.memo(Sidebar);
