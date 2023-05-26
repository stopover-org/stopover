import React from "react";
import { AspectRatio, Box, Grid } from "@mui/joy";
import ClearIcon from "@mui/icons-material/Clear";
import { FormProvider } from "react-hook-form";
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
import AddressFieldset from "./components/AddressFieldset";

const CreateFirmScene = () => {
  const form = useCreateFirmForm();
  const imagesField = form.useFormField("image");

  return (
    <>
      <Breadcrumbs items={["Create Your Firm"]} />
      <FormProvider {...form}>
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

            <AddressFieldset />

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
                <ChipsInput
                  {...form.useFormField("contacts")}
                  label="Contacts"
                />
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
      </FormProvider>
    </>
  );
};

export default React.memo(CreateFirmScene);
