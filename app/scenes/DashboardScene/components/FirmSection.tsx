import { Grid, Stack } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import moment from "moment/moment";
import Section from "../../../components/v2/Section";
import Typography from "../../../components/v2/Typography";
import { FirmSection_FirmFragment$key } from "./__generated__/FirmSection_FirmFragment.graphql";
import { getHumanDateTime } from "../../../lib/utils/dates";

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
  const date = new Date();

  return (
    <Section>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Typography level="h3">{firm.title.toUpperCase()}</Typography>
            <Typography>{getHumanDateTime(moment(date))}</Typography>
          </Stack>
        </Grid>
        <Grid xs={12}>{firm.contactPerson}</Grid>
        <Grid xs={12}>{firm.fullAddress}</Grid>
      </Grid>
    </Section>
  );
};

export default React.memo(FirmSection);
