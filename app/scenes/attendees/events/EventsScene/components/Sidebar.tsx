import { Edit as EditIcon } from "@mui/icons-material";
import { Divider, Grid, useTheme } from "@mui/joy";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import { Moment } from "moment/moment";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import moment from "moment";
import DateRangePicker from "components/v2/DateRangePicker/DateRangePicker";
import Input from "components/v2/Input/Input";
import Link from "components/v2/Link";
import SliderRange from "components/v2/SliderRange/SliderRange";
import { parseValue, useQuery, useUpdateQuery } from "lib/hooks/useQuery";
import { Sidebar_InterestsFragment$key } from "artifacts/Sidebar_InterestsFragment.graphql";
import { Sidebar_EventFiltersFragment$key } from "artifacts/Sidebar_EventFiltersFragment.graphql";
import QueryInput from "components/shared/QueryInput";
import InterestsSelect from "./InterestsSelect";

interface Props {
  eventFiltersFragment: Sidebar_EventFiltersFragment$key;
  interestsQueryFragmentRef: Sidebar_InterestsFragment$key;
  sidebar?: boolean;
}

const Sidebar = ({
  eventFiltersFragment,
  interestsQueryFragmentRef,
  sidebar,
}: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMediumDisplay = useMediaQuery(theme.breakpoints.up("md"));
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

  const priceBoundaries = {
    min: edgeFiltersValues.minPrice.cents / 100,
    max: edgeFiltersValues.maxPrice.cents / 100,
  };

  const minPrice = useQuery("minPrice", priceBoundaries.min, (value) =>
    parseInt(value, 10)
  );

  const maxPrice = useQuery("maxPrice", priceBoundaries.max, (value) =>
    parseInt(value, 10)
  );

  const dates = useQuery("dates", null, (datesStr) => {
    const datesArray = parseValue(datesStr) as string[];
    return datesArray
      .map((dt) => moment(dt))
      .filter((dt: Moment) => dt.isValid());
  });
  const setMinPrice = useUpdateQuery("minPrice");
  const setMaxPrice = useUpdateQuery("maxPrice");
  const setQueryDate = useUpdateQuery("dates", (dts: Moment[]) =>
    JSON.stringify(dts.map((val) => val.format("YYYY-MM-DD")))
  );

  const [selectedDates, setDates] =
    React.useState<[Moment | null, Moment | null]>(dates);

  const [priceRange, setPriceRange] = React.useState<number[]>([
    minPrice,
    maxPrice,
  ]);

  React.useEffect(() => {
    if (priceRange[0] !== minPrice) {
      setMinPrice(priceRange[0]);
    }
    if (priceRange[1] !== maxPrice) {
      setMaxPrice(priceRange[1]);
    }
  }, [priceRange, minPrice, maxPrice]);

  return (
    <Grid
      container
      flexDirection="column"
      sx={{ marginBottom: sidebar ? "10px" : 0 }}
    >
      {!isMediumDisplay && (
        <Grid xs={12}>
          <Link href="/">
            <Image
              src="https://placehold.co/250x75"
              alt="logo"
              width={300}
              height={90}
            />
          </Link>
        </Grid>
      )}
      <Grid xs={12} pb={2}>
        <QueryInput
          queryName="city"
          label={t("scenes.attendees.events.eventsScene.sidebar.city")}
          endDecorator={<EditIcon />}
        />
      </Grid>
      <DateRangePicker
        value={selectedDates}
        onChange={(dts) => {
          if (
            dts.filter(Boolean).length === 2 ||
            dts.filter(Boolean).length === 0
          ) {
            setDates(dts);

            setQueryDate(dts.filter(Boolean));
          }
        }}
        minDate={edgeFiltersValues.startDate}
        disablePast
        clearStyles={{ paddingTop: "30px" }}
        startInputProps={{
          label: t("scenes.attendees.events.eventsScene.sidebar.startDate"),
          placeholder: t(
            "scenes.attendees.events.eventsScene.sidebar.startDatePlaceholder"
          ),
          size: "sm",
        }}
        endInputProps={{
          label: t("scenes.attendees.events.eventsScene.sidebar.endDate"),
          placeholder: t(
            "scenes.attendees.events.eventsScene.sidebar.endDatePlaceholder"
          ),
          size: "sm",
        }}
      />
      <Grid xs={12}>
        <SliderRange
          getAriaLabel={() =>
            t("scenes.attendees.events.eventsScene.sidebar.priceRance")
          }
          value={priceRange}
          onChange={(value) => {
            setPriceRange(value);
          }}
          max={priceBoundaries.max}
          min={priceBoundaries.min}
          valueLabelDisplay="auto"
          size="lg"
          label={t("scenes.attendees.events.eventsScene.sidebar.priceRance")}
        />
      </Grid>
      <Grid xs={12} container sx={{ paddingBottom: "10px" }}>
        <Grid xs={6}>
          <Input
            size="sm"
            type="number"
            value={priceRange[0].toString()}
            onChange={(value) => {
              let newValue = parseInt(value, 10);
              if (Number.isNaN(newValue)) newValue = 0;
              setPriceRange([newValue, priceRange[1]]);

              setMinPrice(newValue);
            }}
            label={t("scenes.attendees.events.eventsScene.sidebar.minPrice")}
            slotProps={{
              input: {
                ...priceBoundaries,
                step: 1,
              },
            }}
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

              setMaxPrice(newValue);
            }}
            label={t("scenes.attendees.events.eventsScene.sidebar.maxPrice")}
            slotProps={{
              input: {
                ...priceBoundaries,
                step: 1,
              },
            }}
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
