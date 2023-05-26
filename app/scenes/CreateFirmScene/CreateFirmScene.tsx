import React from "react";
import { AspectRatio, Box, Grid } from "@mui/joy";
import ClearIcon from "@mui/icons-material/Clear";
import Input from "../../components/v2/Input";
import Typography from "../../components/v2/Typography";
import Button from "../../components/v2/Button";
import { useCreateFirmForm } from "./useCreateFirmForm";
import PhoneInput from "../../components/v2/PhoneInput";
import FileUploader from "../../components/v2/FileUploader";
import TextArea from "../../components/v2/TextArea";
import Fieldset from "../../components/v2/Fieldset";
import Breadcrumbs from "../../components/v2/Breadcrumbs";
import ChipsInput from "../../components/v2/ChipsInput";
import AddressAutocomplete from "../../components/v2/AddressAutocomplete";
import { useCountryCodeFromGMaps } from "../../lib/hooks/useCountryCodeFromGMaps";

const CreateFirmScene = () => {
  const form = useCreateFirmForm();
  const imagesField = form.useFormField("image");
  const [countryCode, setCountryCode] = React.useState<string | null>(null);
  const countryField = form.useFormField("country");
  const gMapCountryCode = useCountryCodeFromGMaps(
    "AIzaSyCTU4ixqqGNU3RFKQEVw5WZP6kTfhyrCic",
    countryCode
  );

  return (
    <>
      <Breadcrumbs items={["Create Your Firm"]} />
      <form onSubmit={form.handleSubmit()}>
        <Grid container spacing={2} md={8} sm={12}>
          <Fieldset>
            <Grid xs={12}>
              <Typography level="h3">Create Your Firm</Typography>
            </Grid>
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
                onChange={(images) => imagesField.onChange(images[0])}
                maxFiles={1}
              />
            </Grid>
            {imagesField.value && (
              <Grid xs={12}>
                <AspectRatio
                  variant="outlined"
                  ratio="4/3"
                  sx={{
                    width: 300,
                    bgcolor: "background.level2",
                    borderRadius: "md",
                    position: "relative",
                  }}
                >
                  <img alt="Logo Preview" src={imagesField.value} />

                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      right: "1rem",
                      top: "1rem",
                      borderRadius: "50%",
                      backgroundColor: "white",
                      width: "30px",
                      height: "30px",
                      padding: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => imagesField.onChange("")}
                  >
                    <ClearIcon sx={{ color: "black" }} />
                  </Box>
                </AspectRatio>
              </Grid>
            )}
          </Fieldset>

          <Fieldset>
            <Grid xs={12}>
              <Typography level="h3">Address</Typography>
            </Grid>
            <Grid md={6} sm={12}>
              <AddressAutocomplete
                apiKey="AIzaSyCTU4ixqqGNU3RFKQEVw5WZP6kTfhyrCic"
                types={["country"]}
                value={countryField.value}
                onChange={(value, placeId) => {
                  countryField.onChange(value);

                  setCountryCode(placeId);
                }}
                label="Country"
              />
            </Grid>
            <Grid md={6} sm={12}>
              <AddressAutocomplete
                apiKey="AIzaSyCTU4ixqqGNU3RFKQEVw5WZP6kTfhyrCic"
                types={[
                  "administrative_area_level_1",
                  "administrative_area_level_2",
                  "administrative_area_level_3",
                ]}
                countries={gMapCountryCode ? [gMapCountryCode] : undefined}
                {...form.useFormField("region")}
                label="Region"
              />
            </Grid>
            <Grid md={6} sm={12}>
              <AddressAutocomplete
                apiKey="AIzaSyCTU4ixqqGNU3RFKQEVw5WZP6kTfhyrCic"
                types={["locality", "administrative_area_level_3"]}
                countries={gMapCountryCode ? [gMapCountryCode] : undefined}
                {...form.useFormField("city")}
                label="City"
              />
            </Grid>
            <Grid md={6} sm={12}>
              <AddressAutocomplete
                apiKey="AIzaSyCTU4ixqqGNU3RFKQEVw5WZP6kTfhyrCic"
                types={["address"]}
                countries={gMapCountryCode ? [gMapCountryCode] : undefined}
                {...form.useFormField("street")}
                label="Street"
              />
            </Grid>
            <Grid md={6} sm={12}>
              <AddressAutocomplete
                apiKey="AIzaSyCTU4ixqqGNU3RFKQEVw5WZP6kTfhyrCic"
                types={["street_number"]}
                countries={gMapCountryCode ? [gMapCountryCode] : undefined}
                {...form.useFormField("houseNumber")}
                label="House Number"
              />
            </Grid>
            {/* <Grid xs={12}> */}
            {/*  <AddressAutocomplete */}
            {/*    apiKey="AIzaSyCTU4ixqqGNU3RFKQEVw5WZP6kTfhyrCic" */}
            {/*    types={["address"]} */}
            {/*    countries={gMapCountryCode ? [gMapCountryCode] : undefined} */}
            {/*    {...form.useFormField("fullAddress")} */}
            {/*    label="Full Address" */}
            {/*  /> */}
            {/* </Grid> */}
          </Fieldset>

          <Fieldset>
            <Grid xs={12}>
              <Typography level="h3">Contact Information</Typography>
            </Grid>
            <Grid md={6} sm={12}>
              <Input
                {...form.useFormField("primaryEmail")}
                label="Primary Email"
              />
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
              <Button type="submit">Submit</Button>
            </Grid>
          </Fieldset>
        </Grid>
      </form>
    </>
  );
};

export default React.memo(CreateFirmScene);
