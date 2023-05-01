import { graphql, useFragment } from "react-relay";
import { Grid } from "@mui/joy";
import React from "react";
import Checkbox from "../../../components/v2/Checkbox/Checkbox";
import Typography from "../../../components/v2/Typography/Typography";
import { getCurrencyFormat } from "../../../lib/utils/currencyFormatter";
import { EventOptionEditForm_EventOptionFragment$key } from "./__generated__/EventOptionEditForm_EventOptionFragment.graphql";

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

  return (
    <Grid container xs={12}>
      <Grid xs={6}>
        <Checkbox
          onChange={() => {}}
          label={eventOption.title}
          checked={eventOption.builtIn}
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
