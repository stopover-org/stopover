import { graphql, usePaginationFragment } from "react-relay";
import React, { useMemo } from "react";
import moment from "moment/moment";
import { Grid } from "@mui/joy";
import useEdges from "../../../../lib/hooks/useEdges";
import Link from "../../../../components/v2/Link/Link";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import { dateTimeFormat } from "../../../../lib/utils/dates";
import Tag from "../../../../components/v2/Tag/Tag";
import { EventsSection_FirmFragment$key } from "./__generated__/EventsSection_FirmFragment.graphql";
import { EventsSectionFirmFragment } from "./__generated__/EventsSectionFirmFragment.graphql";
import Section from "../../../../components/v2/Section/Section";
import Typography from "../../../../components/v2/Typography/Typography";
import Table from "../../../../components/v2/Table/Table";

interface EventsSectionProps {
  firmFragmentRef: EventsSection_FirmFragment$key;
}

const EventsSection = ({ firmFragmentRef }: EventsSectionProps) => {
  const { data } = usePaginationFragment<
    EventsSectionFirmFragment,
    EventsSection_FirmFragment$key
  >(
    graphql`
      fragment EventsSection_FirmFragment on Firm
      @refetchable(queryName: "EventsSectionFirmFragment")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String", defaultValue: "" }
      ) {
        events(first: $count, after: $cursor)
          @connection(key: "DashboardScene_query_events") {
          edges {
            node {
              id
              title
              fullAddress
              organizerPricePerUom {
                cents
                currency {
                  name
                }
              }
              attendeePricePerUom {
                cents
                currency {
                  name
                }
              }
              singleDaysWithTime
              recurringDaysWithTime
            }
          }
        }
      }
    `,
    firmFragmentRef
  );
  const events = useEdges(data.events);
  const actualEvents = useMemo(
    () =>
      events.map((event) => ({
        title: (
          <Link primary href={`/my-firm/events/${event.id}`}>
            {event.title}
          </Link>
        ),
        organizerPrice: getCurrencyFormat(
          event.organizerPricePerUom?.cents,
          event.organizerPricePerUom?.currency.name
        ),
        attendeePrice: getCurrencyFormat(
          event.attendeePricePerUom?.cents,
          event.attendeePricePerUom?.currency.name
        ),
        recurringDaysWithTime: event.recurringDaysWithTime.map((date) => (
          <Tag
            level="body3"
            link={false}
            sx={{ whiteSpace: "nowrap", marginBottom: "2px" }}
          >
            {date}
          </Tag>
        )),
        singleDaysWithTime: event.singleDaysWithTime.map((date) => (
          <>
            <Tag
              level="body3"
              link={false}
              sx={{ whiteSpace: "nowrap", marginBottom: "2px" }}
            >
              {moment(date).format(dateTimeFormat)}
            </Tag>{" "}
          </>
        )),
      })),
    [events]
  );

  const headers = React.useMemo(
    () => [
      { key: "title", label: "Title" },
      { key: "organizerPrice", label: "You get" },
      { key: "attendeePrice", label: "Attendee pay" },
      { key: "recurringDaysWithTime", label: "Recurring Dates" },
      { key: "singleDaysWithTime", label: "Specific dates" },
    ],
    []
  );

  return (
    <Section>
      <Grid xs={12}>
        <Typography level="h3">Events</Typography>
      </Grid>
      <Grid xs={12}>
        <Table data={actualEvents} headers={headers} aria-label="basic table" />
      </Grid>
    </Section>
  );
};

export default React.memo(EventsSection);
