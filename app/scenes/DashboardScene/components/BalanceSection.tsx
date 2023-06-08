import { Grid } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import Section from "../../../components/v2/Section";
import { BalanceSection_FirmFragment$key } from "./__generated__/BalanceSection_FirmFragment.graphql";

interface BalanceSectionProps {
  firmFragmentRef: BalanceSection_FirmFragment$key;
}
const BalanceSection = ({ firmFragmentRef }: BalanceSectionProps) => {
  const balance = useFragment(
    graphql`
      fragment BalanceSection_FirmFragment on Firm {
        balance {
          totalAmount {
            cents
            currency {
              name
              symbol
              fullName
            }
          }
        }
      }
    `,
    firmFragmentRef
  );
  return (
    <Section>
      <Grid>Balance</Grid>
    </Section>
  );
};
export default React.memo(BalanceSection);
