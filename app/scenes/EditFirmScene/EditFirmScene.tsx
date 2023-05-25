import React from "react";
import { AspectRatio, Box, Grid } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import ClearIcon from "@mui/icons-material/Clear";
import Input from "../../components/v2/Input";
import Typography from "../../components/v2/Typography";
import Button from "../../components/v2/Button";
import { useUpdateFirmForm } from "./useUpdateFirmForm";
import Fieldset from "../../components/v2/Fieldset/Fieldset";
import FileUploader from "../../components/v2/FileUploader/FileUploader";
import PhoneInput from "../../components/v2/PhoneInput/PhoneInput";
import TextArea from "../../components/v2/TextArea/TextArea";
import { EditFirmScene_FirmFragment$key } from "./__generated__/EditFirmScene_FirmFragment.graphql";
import ChipsInput from "../../components/v2/ChipsInput";
import Breadcrumbs from "../../components/v2/Breadcrumbs";

const EditFirmScene = ({
  firmFragmentRef,
}: {
  firmFragmentRef: EditFirmScene_FirmFragment$key;
}) => {
  const firm = useFragment(
    graphql`
      fragment EditFirmScene_FirmFragment on Firm {
        ...useUpdateFirmForm_FirmFragment
      }
    `,
    firmFragmentRef
  );
  const form = useUpdateFirmForm(firm);
  const imageField = form.useFormField("image");

  return (
    <>
      <Breadcrumbs items={[{ title: "My Firm", href: "/my-firm" }, "Edit"]} />
      <form onSubmit={form.handleSubmit()}>
        <Grid container spacing={2} md={8} sm={12}>
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
                maxFiles={1}
              />
            </Grid>
            {imageField.value && (
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
                  <img alt="Logo Preview" src={imageField.value} />

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
                    onClick={() => imageField.onChange("")}
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
              <Input {...form.useFormField("country")} label="Country" />
            </Grid>
            <Grid md={6} sm={12}>
              <Input {...form.useFormField("region")} label="Region" />
            </Grid>
            <Grid md={6} sm={12}>
              <Input {...form.useFormField("city")} label="City" />
            </Grid>
            <Grid md={6} sm={12}>
              <Input {...form.useFormField("street")} label="Street" />
            </Grid>
            <Grid md={6} sm={12}>
              <Input
                {...form.useFormField("houseNumber")}
                label="House Number"
              />
            </Grid>
            <Grid xs={12}>
              <Input
                {...form.useFormField("fullAddress")}
                label="Full Address"
                hint="<lattitude>, <longitude>"
              />
            </Grid>
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

export default React.memo(EditFirmScene);
