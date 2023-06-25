import React from "react";
import { AspectRatio, Box, Grid } from "@mui/joy";
import ClearIcon from "@mui/icons-material/Clear";
import Fieldset from "../../v2/Fieldset/Fieldset";
import Input from "../../v2/Input/Input";
import FileUploader from "../../v2/FileUploader/FileUploader";
import AddressFieldset from "../AddressFieldset/AddressFieldset";
import Typography from "../../v2/Typography/Typography";
import PhoneInput from "../../v2/PhoneInput/PhoneInput";
import ChipsInput from "../../v2/ChipsInput/ChipsInput";
import TextArea from "../../v2/TextArea/TextArea";
import Button from "../../v2/Button/Button";
import useFormContext from "../../../lib/hooks/useFormContext";

const EditFirmForm = () => {
  const form = useFormContext();
  const imageField = form.useFormField("image");

  return (
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
          <Button type="submit">Submit</Button>
        </Grid>
      </Fieldset>
    </Grid>
  );
};

export default React.memo(EditFirmForm);
