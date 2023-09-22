import React from "react";
import { Autocomplete, Grid } from "@mui/joy";
import Fieldset from "../../v2/Fieldset/Fieldset";
import Input from "../../v2/Input/Input";
import FileUploader from "../../v2/FileUploader/FileUploader";
import AddressFieldset from "../AddressFieldset/AddressFieldset";
import Typography from "../../v2/Typography/Typography";
import PhoneInput from "../../v2/PhoneInput/PhoneInput";
import ChipsInput from "../../v2/ChipsInput/ChipsInput";
import TextArea from "../../v2/TextArea/TextArea";
import useFormContext from "../../../lib/hooks/useFormContext";
import ImagePreviewFields from "../ImagePreviewFields";
import { capitalize } from "../../../lib/utils/capitalize";
import SubmitButton from "../SubmitButton";

const EditFirmForm = () => {
  const form = useFormContext();
  const paymentTypesField = form.useFormField("paymentTypes");
  const imageField = form.useFormField("image");

  return (
    <Grid container spacing={2} lg={8} md={12} sm={12}>
      <Fieldset>
        <Grid md={6} sm={12}>
          <Input {...form.useFormField("title")} label="Title" />
        </Grid>
        <Grid md={6} sm={12}>
          <Input
            {...form.useFormField("contactPerson")}
            label="Contact Person"
          />
        </Grid>
        <Grid xs={12}>
          <FileUploader
            onChange={(images) => imageField.onChange(images[0])}
            pickerOptions={{ maxFiles: 1 }}
          />
        </Grid>
        <ImagePreviewFields />
      </Fieldset>

      <Fieldset>
        <Grid xs={12}>
          <Typography level="h3">Contact Information</Typography>
        </Grid>
        <Grid xs={12}>
          <Autocomplete
            disableClearable
            multiple
            placeholder="Available Payment Types"
            options={["Cash", "Stripe"].map((v) => ({
              label: capitalize(v),
              value: v.toLowerCase(),
            }))}
            onChange={(
              event,
              values: Array<{ label: string; value: string }>
            ) => {
              const newValue = values.reduce((res, val) => {
                if (res.includes(val.value)) {
                  return res;
                }
                res.push(val.value);
                return res;
              }, [] as string[]);

              paymentTypesField.onChange(newValue);
            }}
            getOptionLabel={(option) => option.label}
            value={paymentTypesField.value.map((val: string) => ({
              label: capitalize(val),
              value: val.toLowerCase(),
            }))}
          />
        </Grid>
      </Fieldset>

      <AddressFieldset />

      <Fieldset>
        <Grid xs={12}>
          <Typography level="h3">Contact Information</Typography>
        </Grid>
        <Grid md={6} sm={12}>
          <Input {...form.useFormField("primaryEmail")} label="Primary Email" />
        </Grid>
        <Grid md={6} sm={12}>
          <PhoneInput
            {...form.useFormField("primaryPhone")}
            label="Primary Phone"
          />
        </Grid>
        <Grid xs={12}>
          <ChipsInput {...form.useFormField("contacts")} label="Contacts" />
        </Grid>
        <Grid xs={12}>
          <Input {...form.useFormField("website")} label="Website" />
        </Grid>
      </Fieldset>

      <Fieldset>
        <Grid xs={12}>
          <Typography level="h3">Description</Typography>
        </Grid>
        <Grid xs={12}>
          <TextArea
            {...form.useFormField("description")}
            label="Description"
            minRows={5}
          />
        </Grid>
      </Fieldset>

      <Fieldset>
        <Grid xs={12}>
          <SubmitButton submitting={form.formState.isSubmitting}>
            Submit
          </SubmitButton>
        </Grid>
      </Fieldset>
    </Grid>
  );
};

export default React.memo(EditFirmForm);
