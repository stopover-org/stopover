import { graphql, useFragment } from "react-relay";
import { Grid } from "@mui/joy";
import React from "react";
import moment from "moment";
import Checkbox from "../../../../../components/v2/Checkbox/Checkbox";
import Typography from "../../../../../components/v2/Typography/Typography";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import { EventOptionEditForm_EventOptionFragment$key } from "../../../../../artifacts/EventOptionEditForm_EventOptionFragment.graphql";
import useFormContext from "../../../../../lib/hooks/useFormContext";
import { EventOptionEditForm_BookingFragment$key } from "../../../../../artifacts/EventOptionEditForm_BookingFragment.graphql";

interface EventOptionEditFormProps {
  eventOptionFragmentRef: EventOptionEditForm_EventOptionFragment$key;
  bookingFragmentRef: EventOptionEditForm_BookingFragment$key;
}

const EventOptionEditForm = ({
  eventOptionFragmentRef,
  bookingFragmentRef,
}: EventOptionEditFormProps) => {
  const booking = useFragment(
    graphql`
      fragment EventOptionEditForm_BookingFragment on Booking {
        status
        bookedFor
      }
    `,
    bookingFragmentRef
  );

  const eventOption = useFragment(
    graphql`
      fragment EventOptionEditForm_EventOptionFragment on EventOption {
        builtIn
        title
        id
        attendeePrice {
          cents
          currency {
            name
          }
        }
      }
    `,
    eventOptionFragmentRef
  );
  const form = useFormContext();
  const eventOptions = form.useFormField<string[]>("eventOptionIds");
  const checked = React.useMemo(
    () => !!eventOptions.value.find((id) => id === eventOption.id),
    [eventOption, eventOptions]
  );

  const disabled = React.useMemo(
    () =>
      booking.status !== "active" ||
      moment(booking.bookedFor).isBefore(new Date()),
    [booking.status, booking.bookedFor]
  );

  const onChange = React.useCallback(() => {
    if (disabled) return;
    if (eventOptions.value.find((id) => id === eventOption.id)) {
      eventOptions.onChange(
        eventOptions.value.filter((id) => id !== eventOption.id)
      );
    } else {
      eventOptions.onChange([...eventOptions.value, eventOption.id]);
    }
  }, [eventOptions.value, disabled]);

  return (
    <Grid container xs={12}>
      <Grid xs={6}>
        <Checkbox
          onChange={onChange}
          label={eventOption.title}
          checked={checked}
          readOnly={disabled}
        />
      </Grid>
      <Grid xs={3}>
        <Typography>
          <Typography strikeThrough={eventOption.builtIn}>
            +&nbsp;
            {getCurrencyFormat(
              eventOption?.attendeePrice?.cents,
              eventOption?.attendeePrice?.currency?.name
            )}
          </Typography>
          {eventOption.builtIn && (
            <>
              &nbsp;&nbsp;+&nbsp;
              {getCurrencyFormat(0, eventOption?.attendeePrice?.currency?.name)}
            </>
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default React.memo(EventOptionEditForm);
