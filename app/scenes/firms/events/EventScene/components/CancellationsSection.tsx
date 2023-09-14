import { graphql, useFragment } from "react-relay";
import { Grid } from "@mui/joy";
import React from "react";
import Section from "../../../../../components/v2/Section";
import Typography from "../../../../../components/v2/Typography";
import { CancellationsSection_EventFragment$key } from "../../../../../artifacts/CancellationsSection_EventFragment.graphql";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";

interface CancellationsSectionProps {
  eventFragmentRef: CancellationsSection_EventFragment$key;
}

const CancellationsSection = ({
  eventFragmentRef,
}: CancellationsSectionProps) => {
  const event = useFragment<CancellationsSection_EventFragment$key>(
    graphql`
      fragment CancellationsSection_EventFragment on Event {
        bookingCancellationOptions {
          penaltyPrice {
            cents
            currency {
              name
            }
          }
          deadline
          description
        }
      }
    `,
    eventFragmentRef
  );

  return (
    <Section>
      <Grid xs={12}>
        <Typography level="h3">Booking Cancellation Options</Typography>
      </Grid>
      {event.bookingCancellationOptions.length === 0 && (
        <Grid xs={12}>
          <Typography>Booking Cancellation is free</Typography>
        </Grid>
      )}
      {event.bookingCancellationOptions.length !== 0 && (
        <>
          <Grid xs={12}>
            <Typography>
              Cancellation prior to{" "}
              {event.bookingCancellationOptions[0]?.deadline} hours prior to
              event will result {getCurrencyFormat(0, "usd")}
            </Typography>
          </Grid>
          {event.bookingCancellationOptions.map((opt) => (
            <Grid xs={12}>
              <Typography>
                Cancellation up to {opt.deadline} hours prior to event will
                result{" "}
                {getCurrencyFormat(
                  opt.penaltyPrice?.cents,
                  opt.penaltyPrice?.currency?.name
                )}{" "}
                penalty
              </Typography>
            </Grid>
          ))}
        </>
      )}
    </Section>
  );
};

export default React.memo(CancellationsSection);
