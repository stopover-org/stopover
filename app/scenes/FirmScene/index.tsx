import React from "react";
import { Grid } from "@mui/joy";
import { FormProvider } from "react-hook-form";
import Input from "../../components/v2/Input";
import Typography from "../../components/v2/Typography";
import Button from "../../components/v2/Button";

const FirmScene = () => (
  <FormProvider>
    <Grid container spacing={2} padding={2}>
      <Grid xs={12}>
        <Typography>Firm title</Typography>
      </Grid>
      <Grid xs={6}>
        <Input hint="title" />
      </Grid>
      <Grid xs={6}>
        <Input hint="contact_person" />
      </Grid>

      <Grid xs={12} pt={5}>
        <Typography>Address</Typography>
      </Grid>
      <Grid xs={6}>
        <Input hint="country" />
      </Grid>
      <Grid xs={6}>
        <Input hint="city" />
      </Grid>
      <Grid xs={6}>
        <Input hint="street" />
      </Grid>
      <Grid xs={6}>
        <Input hint="house_number" />
      </Grid>
      <Grid xs={12}>
        <Input hint="full_address" />
      </Grid>

      <Grid xs={12} pt={5}>
        <Typography>Contact information</Typography>
      </Grid>
      <Grid xs={12}>
        <Input hint="contacts" />
      </Grid>
      <Grid xs={6}>
        <Input hint="primary_email" />
      </Grid>
      <Grid xs={6}>
        <Input hint="primary_phone" />
      </Grid>
      <Grid xs={12}>
        <Input hint="website" />
      </Grid>

      <Grid xs={12} pt={5}>
        <Typography>Description</Typography>
      </Grid>
      <Grid xs={12}>
        <Input hint="description" />
      </Grid>

      <Grid xs={6}>
        <Button type="submit">Submit</Button>
      </Grid>
    </Grid>
  </FormProvider>
);

export default React.memo(FirmScene);
