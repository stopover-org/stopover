import { graphql, useFragment } from "react-relay";
import { Grid } from "@mui/joy";
import React from "react";
import Checkbox from "../../../components/v2/Checkbox/Checkbox";
import Typography from "../../../components/v2/Typography/Typography";
import { getCurrencyFormat } from "../../../lib/utils/currencyFormatter";
import { EventOptionEditForm_EventOptionFragment$key } from "./__generated__/EventOptionEditForm_EventOptionFragment.graphql";
import useFormContext from "../../../lib/hooks/useFormContext";

interface EventOptionEditFormProps {
  eventOptionFragmentRef: EventOptionEditForm_EventOptionFragment$key;
}

const EventOptionEditForm = ({
  eventOptionFragmentRef,
}: EventOptionEditFormProps) => {
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
  const onChange = React.useCallback(() => {
    if (eventOptions.value.find((id) => id === eventOption.id)) {
      eventOptions.onChange(
        eventOptions.value.filter((id) => id !== eventOption.id)
      );
    } else {
      eventOptions.onChange(eventOptions.value.push(eventOption.id));
    }
  }, [eventOptions.value]);

  const checked = React.useMemo(
    () => !!eventOptions.value.find((id) => id === eventOption.id),
    [eventOption, eventOptions]
  );

  return (
    <Grid container xs={12}>
      <Grid xs={6}>
        <Checkbox
          onChange={onChange}
          label={eventOption.title}
          checked={checked}
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
