import { Grid, Stack } from "@mui/joy";
import React from "react";
import Section from "../../../components/v2/Section";
import Typography from "../../../components/v2/Typography";

const FirmSection = () => (
  <Section>
    <Grid container spacing={2} md={10} sm={12}>
      <Grid xs={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Firm name</Typography>
          <Typography>Date</Typography>
        </Stack>
      </Grid>
      <Grid xs={12}>contact person</Grid>
      <Grid xs={12}>address</Grid>
    </Grid>
  </Section>
);

export default React.memo(FirmSection);
