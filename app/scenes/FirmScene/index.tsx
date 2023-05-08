import React from "react";
import { Grid } from "@mui/joy";
import Input from "../../components/v2/Input";
import Typography from "../../components/v2/Typography";
import Button from "../../components/v2/Button";

const FirmScene = () => (
  <form>
    <Grid container spacing={2} padding={2}>
      <Grid xs={12}>
        <Typography level="h3">Firm title</Typography>
      </Grid>
      <Grid xs={6}>
        <Input label="Title" />
      </Grid>
      <Grid xs={6}>
        <Input label="Contact Person" />
      </Grid>

      <Grid xs={12} pt={5}>
        <Typography level="h3">Address</Typography>
      </Grid>
      <Grid xs={6}>
        <Input label="Country" />
      </Grid>
      <Grid xs={6}>
        <Input label="Region" />
      </Grid>
      <Grid xs={6}>
        <Input label="City" />
      </Grid>
      <Grid xs={6}>
        <Input label="Street" />
      </Grid>
      <Grid xs={6}>
        <Input label="House Number" />
      </Grid>
      <Grid xs={12}>
        <Input label="Full Address" hint="<lattitude>, <longitude>" />
      </Grid>

      <Grid xs={12} pt={5}>
        <Typography level="h3">Contact Information</Typography>
      </Grid>
      <Grid xs={6}>
        <Input label="Primary Email" />
      </Grid>
      <Grid xs={6}>
        <Input label="Primary Phone" />
      </Grid>
      <Grid xs={12}>
        <Input label="Contacts" />
      </Grid>
      <Grid xs={12}>
        <Input label="WebSite" />
      </Grid>

      <Grid xs={12} pt={5}>
        <Typography level="h3">Description</Typography>
      </Grid>
      <Grid xs={12}>
        <Input label="Description" />
      </Grid>

      <Grid xs={6}>
        <Button type="submit">Submit</Button>
      </Grid>
    </Grid>
  </form>
);

export default React.memo(FirmScene);
