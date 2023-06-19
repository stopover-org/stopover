import React from "react";
import { AspectRatio, Box, Grid, Option, Stack } from "@mui/joy";
import ClearIcon from "@mui/icons-material/Clear";
import Fieldset from "../../../../../components/v2/Fieldset/Fieldset";
import Input from "../../../../../components/v2/Input/Input";
import FileUploader from "../../../../../components/v2/FileUploader/FileUploader";
import AddressFieldset from "../../../../../lib/shared/AddressFieldset/AddressFieldset";
import useFormContext from "../../../../../lib/hooks/useFormContext";
import Typography from "../../../../../components/v2/Typography/Typography";
import Checkbox from "../../../../../components/v2/Checkbox/Checkbox";
import Select from "../../../../../components/v2/Select/Select";
import TextArea from "../../../../../components/v2/TextArea/TextArea";

const GeneralStep = () => {
  const form = useFormContext();
  const imagesField = form.useFormField<string[]>("images");
  const requiresCheckInField = form.useFormField("requiresCheckIn");
  const requiresContractField = form.useFormField("requiresContract");
  const requiresPassport = form.useFormField("requiresPassport");
  const eventType = form.useFormField("eventType");
  const organizerPriceField = form.useFormField("organizerPricePerUomCents");

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
            onChange={(images) =>
              imagesField.onChange([...imagesField.value, ...images])
            }
          />
        </Grid>
        <Grid xs={12}>
          <Stack flexDirection="row" flexWrap="wrap">
            {imagesField.value.map((image, index) => (
              <AspectRatio
                variant="outlined"
                ratio="4/3"
                sx={{
                  width: 300,
                  bgcolor: "background.level2",
                  borderRadius: "md",
                  position: "relative",
                  marginRight: "5px",
                  marginTop: "5px",
                }}
              >
                <img alt="Logo Preview" src={image} />

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
                  onClick={() =>
                    imagesField.onChange([
                      ...imagesField.value.slice(0, index),
                      ...imagesField.value.slice(index + 1),
                    ])
                  }
                >
                  <ClearIcon sx={{ color: "black" }} />
                </Box>
              </AspectRatio>
            ))}
          </Stack>
        </Grid>
        <Grid xs={12}>
          <Input
            placeholder="Amount"
            startDecorator="$"
            label="Organizer Price"
            sx={{ width: 300 }}
            type="number"
            {...organizerPriceField}
          />
        </Grid>
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
