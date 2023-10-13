import { graphql, useFragment } from "react-relay";
import { Grid } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <Section>
      <Grid xs={12}>
        <Typography level="h3">
          {t("models.bookingCancellationOption.plural")}
        </Typography>
      </Grid>
      {event.bookingCancellationOptions.length === 0 && (
        <Grid xs={12}>
          <Typography>
            {t(
              "models.bookingCancellationOption.terms.withoutCancellationTerms"
            )}
          </Typography>
        </Grid>
      )}
      {event.bookingCancellationOptions.length !== 0 && (
        <>
          <Grid xs={12}>
            <Typography>
              {t("models.bookingCancellationOption.terms.withoutPenalty", {
                deadline: event.bookingCancellationOptions[0]?.deadline,
                penalty: getCurrencyFormat(0, "usd"),
              })}
            </Typography>
          </Grid>
          {event.bookingCancellationOptions.map((opt) => (
            <Grid xs={12}>
              <Typography>
                {t("models.bookingCancellationOption.terms.withPenalty", {
                  deadline: opt.deadline,
                  penalty: getCurrencyFormat(
                    opt.penaltyPrice?.cents,
                    opt.penaltyPrice?.currency?.name
                  ),
                })}
              </Typography>
            </Grid>
          ))}
        </>
      )}
    </Section>
  );
};

export default React.memo(CancellationsSection);
