import React from "react";
import { Grid } from "@mui/joy";
import Input from "../../components/v2/Input";
import Typography from "../../components/v2/Typography";
import Button from "../../components/v2/Button";

import { useCreateFirmForm } from "./useCreateFirmForm";
import ChipsInput from "../../components/v2/ChipsInput";

const FirmScene = () => {
  const form = useCreateFirmForm();
  return (
    <form onSubmit={form.handleSubmit()}>
      <Grid container spacing={2} padding={2}>
        <Grid xs={12}>
          <Typography level="h3">Firm title</Typography>
        </Grid>
        <Grid xs={6}>
          <Input {...form.useFormField("title")} label="Title" />
        </Grid>
        <Grid xs={6}>
          <Input
            {...form.useFormField("contactPerson")}
            label="Contact Person"
          />
        </Grid>

        <Grid xs={12} pt={5}>
          <Typography level="h3">Address</Typography>
        </Grid>
        <Grid xs={6}>
          <Input {...form.useFormField("country")} label="Country" />
        </Grid>
        <Grid xs={6}>
          <Input {...form.useFormField("region")} label="Region" />
        </Grid>
        <Grid xs={6}>
          <Input {...form.useFormField("city")} label="City" />
        </Grid>
        <Grid xs={6}>
          <Input {...form.useFormField("street")} label="Street" />
        </Grid>
        <Grid xs={6}>
          <Input {...form.useFormField("houseNumber")} label="House Number" />
        </Grid>
        <Grid xs={12}>
          <Input
            {...form.useFormField("fullAddress")}
            label="Full Address"
            hint="<lattitude>, <longitude>"
          />
        </Grid>

        <Grid xs={12} pt={5}>
          <Typography level="h3">Contact Information</Typography>
        </Grid>
        <Grid xs={6}>
          <Input {...form.useFormField("primaryEmail")} label="Primary Email" />
        </Grid>
        <Grid xs={6}>
          <Input {...form.useFormField("primaryPhone")} label="Primary Phone" />
        </Grid>
        <Grid xs={12}>
          <ChipsInput {...form.useFormField("contacts")} label="Contacts" />
        </Grid>
        <Grid xs={12}>
          <Input {...form.useFormField("website")} label="Website" />
        </Grid>

        <Grid xs={12} pt={5}>
          <Typography level="h3">Description</Typography>
        </Grid>
        <Grid xs={12}>
          <Input {...form.useFormField("description")} label="Description" />
        </Grid>

        <Grid xs={6}>
          <Button type="submit">Submit</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default React.memo(FirmScene);
