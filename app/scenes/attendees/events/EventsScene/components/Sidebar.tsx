import { Divider, Grid } from "@mui/joy";
import React from "react";
import { Moment } from "moment/moment";
import { Edit as EditIcon } from "@mui/icons-material";
import { graphql, RefetchFn, useFragment } from "react-relay";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/router";
import Input from "../../../../../components/v2/Input/Input";
import DateRangePicker from "../../../../../components/v2/DateRangePicker/DateRangePicker";
import SliderRange from "../../../../../components/v2/SliderRange/SliderRange";
import Checkbox from "../../../../../components/v2/Checkbox/Checkbox";
import RatingSelector from "../../../../../components/v2/RatingSelector";
import { Sidebar_EventFiltersFragment$key } from "../../../../../artifacts/Sidebar_EventFiltersFragment.graphql";
import InterestsSelect from "./InterestsSelect";
import { Sidebar_InterestsFragment$key } from "../../../../../artifacts/Sidebar_InterestsFragment.graphql";

interface Props {
  eventFiltersFragment: Sidebar_EventFiltersFragment$key;
  interestsQueryFragmentRef: Sidebar_InterestsFragment$key;
  onChange: (args: Record<string, any>) => void;
}

const Sidebar = ({
  eventFiltersFragment,
  interestsQueryFragmentRef,
  onChange,
}: Props) => {
  const router = useRouter();
  const edgeFiltersValues = useFragment<Sidebar_EventFiltersFragment$key>(
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

  const interestsQuery = useFragment<Sidebar_InterestsFragment$key>(
    graphql`
      fragment Sidebar_InterestsFragment on Query {
        ...InterestsSelect_InterestsFragment
      }
    `,
    interestsQueryFragmentRef
  );
  const ref = React.useRef<NodeJS.Timeout | null>(null);
  const [selectedDates, setDates] = React.useState<
    [Moment | null, Moment | null]
  >([null, null]);

  const [priceRange, setPriceRange] = React.useState<number[]>([
    edgeFiltersValues.minPrice.cents,
    edgeFiltersValues.maxPrice.cents,
  ]);
  const [city, setCity] = React.useState("");
  const query = React.useMemo(
    () =>
      typeof router?.query?.query === "string" ? router?.query?.query : "",
    [router.query?.query]
  );

  const filters = React.useMemo(
    () => ({
      filters: {
        startDate: selectedDates[0]?.toDate(),
        endDate: selectedDates[1]?.toDate(),
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        city,
        query,
      },
    }),
    [selectedDates, priceRange, city, query]
  );

  React.useEffect(() => {
    if (ref.current) {
      clearTimeout(ref.current);

      ref.current = null;
    }
    ref.current = setTimeout(() => {
      onChange(filters);

      ref.current = null;
    }, 1000);
  }, [filters, ref]);

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
        onChange={(dates) => {
          if (
            dates.filter(Boolean).length === 2 ||
            dates.filter(Boolean).length === 0
          ) {
            setDates(dates);
          }
        }}
        minDate={edgeFiltersValues.startDate}
        disablePast
        startInputProps={{
          label: "Start Date",
          placeholder: "Enter Start of your trip",
          size: "sm",
        }}
        endInputProps={{
          label: "End Date",
          placeholder: "Enter End of your trip",
          size: "sm",
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
            size="sm"
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
            size="sm"
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
      <Grid xs={12}>
        <Divider />
      </Grid>
      <Grid xs={12} container>
        <InterestsSelect queryFragmentRef={interestsQuery} />
      </Grid>
    </Grid>
  );
};

export default React.memo(Sidebar);
