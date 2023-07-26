import React from "react";
import { Grid, Option, Stack } from "@mui/joy";
import Fieldset from "../../../v2/Fieldset/Fieldset";
import Input from "../../../v2/Input/Input";
import FileUploader from "../../../v2/FileUploader/FileUploader";
import AddressFieldset from "../../AddressFieldset/AddressFieldset";
import useFormContext from "../../../../lib/hooks/useFormContext";
import Typography from "../../../v2/Typography/Typography";
import Checkbox from "../../../v2/Checkbox/Checkbox";
import Select from "../../../v2/Select/Select";
import TextArea from "../../../v2/TextArea/TextArea";
import ImagesPreviewFields from "../../ImagesPreviewFields";

const GeneralStep = () => {
  const form = useFormContext();
  const imagesField = form.useFormField<string[]>("images");
  const requiresCheckInField = form.useFormField("requiresCheckIn");
  const requiresContractField = form.useFormField("requiresContract");
  const requiresPassport = form.useFormField("requiresPassport");
  const eventType = form.useFormField("eventType");

  return (
    <>
      <Fieldset>
        <Grid xs={12}>
          <Typography level="h3">General Information</Typography>
        </Grid>
        <Grid xs={12}>
          <Input {...form.useFormField("title")} label="Title" />
        </Grid>

        <Grid xs={12}>
          <FileUploader
            pickerOptions={{ maxFiles: 10 }}
            onChange={(images) =>
              imagesField.onChange([...imagesField.value, ...images])
            }
          />
        </Grid>
        <ImagesPreviewFields />
      </Fieldset>
      <AddressFieldset />
      <Fieldset>
        <Grid xs={12}>
          <Typography level="h3">Event Requirements</Typography>
        </Grid>
        <Grid xs={12}>
          <Stack>
            <Checkbox
              label="Requires Check In"
              checked={Boolean(requiresCheckInField.value)}
              onChange={() =>
                requiresCheckInField.onChange(!requiresCheckInField.value)
              }
            />
            <Checkbox
              label="Requires Contract Signing"
              checked={Boolean(requiresContractField.value)}
              onChange={() =>
                requiresContractField.onChange(!requiresContractField.value)
              }
              sx={{ paddingTop: "5px" }}
            />
            <Checkbox
              label="Requries ID"
              checked={Boolean(requiresPassport.value)}
              onChange={() =>
                requiresPassport.onChange(!requiresPassport.value)
              }
              sx={{ paddingTop: "5px" }}
            />
          </Stack>
        </Grid>

        <Grid xs={12}>
          <Typography level="h3">Event Type</Typography>
        </Grid>
        <Grid xs={12}>
          <Select
            label="Type of Event"
            placeholder="Select Type"
            onChange={(value) => {
              eventType.onChange(value);
            }}
            value={eventType.value}
          >
            <Option value="excursion">Excursion</Option>
            <Option value="tour">Tour</Option>
            <Option value="in_town">In Town</Option>
            <Option value="out_of_town">Out Of Town</Option>
            <Option value="active_holiday">Active Holiday</Option>
            <Option value="music">Music</Option>
            <Option value="workshop">Workshop</Option>
            <Option value="business_breakfast">Business Breakfast</Option>
            <Option value="meetup">Meetup</Option>
            <Option value="sport_activity">Sport Activity</Option>
            <Option value="gastronomic">Gastronomic</Option>
          </Select>
        </Grid>
      </Fieldset>
      <Fieldset>
        <Grid container>
          <Grid xs={12}>
            <Typography level="h3">Attendees</Typography>
          </Grid>
          <Grid xs={6}>
            <Input
              type="number"
              label="Minimum Attendees"
              placeholder="Min"
              slotProps={{
                input: {
                  min: 0,
                  step: 1,
                },
              }}
              {...form.useFormField("minAttendees")}
            />
          </Grid>
          <Grid xs={6}>
            <Input
              type="number"
              label="Maximum Attendees"
              placeholder="Max"
              slotProps={{
                input: {
                  min: 0,
                  step: 1,
                },
              }}
              {...form.useFormField("maxAttendees")}
            />
          </Grid>
        </Grid>
      </Fieldset>
      <Fieldset>
        <Grid xs={12}>
          <Typography level="h3">Description</Typography>
        </Grid>
        <Grid xs={12}>
          <TextArea
            minRows={6}
            {...form.useFormField("description")}
            placeholder="Description"
          />
        </Grid>
      </Fieldset>
    </>
  );
};

export default React.memo(GeneralStep);
