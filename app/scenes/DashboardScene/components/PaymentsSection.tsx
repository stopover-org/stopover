import { Grid, Stack } from "@mui/joy";
import React from "react";
import Section from "../../../components/v2/Section";
import Typography from "../../../components/v2/Typography/Typography";

const PaymentsSection = () => (
  <Section>
    <Stack>
      <Grid>payments</Grid>
      <Typography>100$</Typography>
      <Typography>100$</Typography>
      <Typography>100$</Typography>
      <Typography>100$</Typography>
      <Typography>100$</Typography>
    </Stack>
  </Section>
);

export default React.memo(PaymentsSection);
