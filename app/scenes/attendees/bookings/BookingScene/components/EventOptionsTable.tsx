import { graphql, useFragment } from "react-relay";
import React from "react";
import { IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import Table from "../../../../../components/v2/Table";
import { EventOptionsTable_BookingFragment$key } from "./__generated__/EventOptionsTable_BookingFragment.graphql";

interface EventOptionsTableProps {
  bookingFragmentRef: any;
}

const EventOptionsTable = ({ bookingFragmentRef }: EventOptionsTableProps) => {
  const booking = useFragment<EventOptionsTable_BookingFragment$key>(
    graphql`
      fragment EventOptionsTable_BookingFragment on Booking {
        bookingOptions {
          eventOption {
            organizerPrice {
              cents
              currency {
                name
              }
            }
            attendeePrice {
              cents
              currency {
                name
              }
            }
          }
        }
      }
    `,
    bookingFragmentRef
  );

  const headers = React.useMemo(
    () => [
      {
        label: "Option Name",
        key: "title",
      },
      {
        label: "You Get",
        key: "organizerPrice",
      },
      {
        label: "Attendee Pay",
        key: "attendeePrice",
      },
      {
        label: "",
        key: "remove",
      },
    ],
    []
  );

  const data = React.useMemo(
    () =>
      booking.bookingOptions.map((opt) => ({
        title: opt.eventOptions.title,

        organizerPrice: getCurrencyFormat(
          booking.eventOption.organizerPrice.cents,
          booking.eventOption.organizerPrice.currency.name
        ),
        attendeePrice: getCurrencyFormat(
          booking.eventOption.attendeePrice.cents,
          booking.eventOption.attendeePrice.currency.name
        ),
        remove: (
          <IconButton color="danger" size="sm">
            <DeleteIcon />
          </IconButton>
        ),
      })),
    [booking]
  );
  return <Table headers={headers} data={data} />;
};

export default React.memo(EventOptionsTable);
