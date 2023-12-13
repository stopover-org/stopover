import { Edit as EditIcon } from "@mui/icons-material";
import { Divider, Grid, useTheme } from "@mui/joy";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import { Moment } from "moment/moment";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { Sidebar_EventFiltersFragment$key } from "../../../../../artifacts/Sidebar_EventFiltersFragment.graphql";
import { Sidebar_InterestsFragment$key } from "../../../../../artifacts/Sidebar_InterestsFragment.graphql";
import DateRangePicker from "../../../../../components/v2/DateRangePicker/DateRangePicker";
import Input from "../../../../../components/v2/Input/Input";
import Link from "../../../../../components/v2/Link";
import SliderRange from "../../../../../components/v2/SliderRange/SliderRange";
import InterestsSelect from "./InterestsSelect";
import { useQuery } from "../../../../../lib/hooks/useQuery";

interface Props {
  eventFiltersFragment: Sidebar_EventFiltersFragment$key;
  interestsQueryFragmentRef: Sidebar_InterestsFragment$key;
  onChange: (args: Record<string, any>) => void;
  sidebar?: boolean;
}

const Sidebar = ({
  eventFiltersFragment,
  interestsQueryFragmentRef,
  onChange,
  sidebar,
}: Props) => {
  const query = useQuery("query");
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
  const ref = React.useRef<NodeJS.Timeout | null>(null);
  const [selectedDates, setDates] = React.useState<
    [Moment | null, Moment | null]
  >([null, null]);

  const [priceRange, setPriceRange] = React.useState<number[]>([
    edgeFiltersValues.minPrice.cents / 100,
    edgeFiltersValues.maxPrice.cents / 100,
  ]);
  const [city, setCity] = React.useState("");
  const filters = React.useMemo(
    () => ({
      filters: {
        startDate: selectedDates[0]?.toDate(),
        endDate: selectedDates[1]?.toDate(),
        minPrice: priceRange[0] * 100,
        maxPrice: priceRange[1] * 100,
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
    <Grid
      container
      flexDirection="column"
      sx={{ marginBottom: sidebar ? "10px" : 0 }}
    >
      {!isMediumDisplay && (
        <Grid xs={12}>
          <Link href="/">
            <Image src="https://placehold.co/250x75" width={300} height={90} />
          </Link>
        </Grid>
      )}
      <Grid xs={12}>
        <Input
          onChange={(value) => setCity(value)}
          value={city}
          label={t("scenes.attendees.events.eventsScene.sidebar.city")}
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
          onChange={(value) => setPriceRange(value)}
          max={edgeFiltersValues.maxPrice.cents / 100}
          min={edgeFiltersValues.minPrice.cents / 100}
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
              let newValue = parseInt(value, 10) * 100;
              if (Number.isNaN(newValue)) newValue = 0;
              setPriceRange([newValue, priceRange[1]]);
            }}
            label={t("scenes.attendees.events.eventsScene.sidebar.minPrice")}
          />
        </Grid>
        <Grid xs={6}>
          <Input
            size="sm"
            type="number"
            value={priceRange[1].toString()}
            onChange={(value) => {
              let newValue = parseInt(value, 10) * 100;
              if (Number.isNaN(newValue)) newValue = 0;
              setPriceRange([priceRange[0], newValue]);
            }}
            label={t("scenes.attendees.events.eventsScene.sidebar.maxPrice")}
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
