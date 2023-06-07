import { Grid, Stack } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import Section from "../../../components/v2/Section";
import Typography from "../../../components/v2/Typography";
import { FirmSection_FirmFragment$key } from "./__generated__/FirmSection_FirmFragment.graphql";

interface FirmSectionProps {
  firmFragmentRef: FirmSection_FirmFragment$key;
}

const FirmSection = ({ firmFragmentRef }: FirmSectionProps) => {
  const firm = useFragment(
    graphql`
      fragment FirmSection_FirmFragment on Firm {
        title
        contactPerson
        fullAddress
      }
    `,
    firmFragmentRef
  );

  return (
    <Section>
      <Grid container spacing={2} md={10} sm={12}>
        <Grid xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Firm title</Typography>
            <Typography>Date</Typography>
          </Stack>
        </Grid>
        <Grid xs={12}>contact person</Grid>
        <Grid xs={12}>address</Grid>
      </Grid>
    </Section>
  );
};

export default React.memo(FirmSection);
