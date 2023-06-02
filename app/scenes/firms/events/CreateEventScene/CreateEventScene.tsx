import { Grid, Option, Stack, Box, AspectRatio } from "@mui/joy";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { FormProvider } from "react-hook-form";
import Typography from "../../../../components/v2/Typography";
import Input from "../../../../components/v2/Input";
import { useCreateEventForm } from "./useCreateEventForm";
import FileUploader from "../../../../components/v2/FileUploader/FileUploader";
import Checkbox from "../../../../components/v2/Checkbox";
import Select from "../../../../components/v2/Select";
import TextArea from "../../../../components/v2/TextArea";
import Breadcrumbs from "../../../../components/v2/Breadcrumbs/Breadcrumbs";
import Fieldset from "../../../../components/v2/Fieldset";
import AddressFieldset from "../../../../lib/shared/AddressFieldset";
import RecurringDateFieldset from "../../../CreateEventScene/components/RecurringDateFieldset";
import Button from "../../../../components/v2/Button";

const CreateEventScene = () => {
  const form = useCreateEventForm();
  const imagesField = form.useFormField<string[]>("images");
  const requiresCheckInField = form.useFormField("requiresCheckIn");
  const requiresContractField = form.useFormField("requiresContract");
  const requiresPassport = form.useFormField("requiresPassport");
  const recurringType = form.useFormField("recurringType");
  const eventType = form.useFormField("eventType");

  return (
    <>
      <Breadcrumbs
        items={[{ title: "My Firm", href: "/my-firm" }, "New Event"]}
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit()}>
          <Grid container spacing={2} md={10} sm={12}>
            <Fieldset>
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
                            ...imagesField.value.slice(index),
                            ...imagesField.value.slice(
                              index + 1,
                              imagesField.value.length
                            ),
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
                  {...form.useFormField("organizerPricePerUomCents")}
                />
              </Grid>
            </Fieldset>
            <AddressFieldset />
            <RecurringDateFieldset />;
            <Fieldset>
              <Grid xs={12}>
                <Select
                  label="Recurring type"
                  placeholder="Select Type"
                  onChange={(_, value) => {
                    recurringType.onChange(value);
                  }}
                  value={recurringType.value}
                >
                  <Option value="recurrent">recurrent</Option>
                  <Option value="general">general</Option>
                </Select>
              </Grid>
            </Fieldset>
            <Fieldset>
              <Grid xs={12}>
                <Typography level="h3">Event Requirements</Typography>
              </Grid>
              <Grid xs={12}>
                <Stack>
                  <Checkbox
                    label="requires_check_in"
                    checked={Boolean(requiresCheckInField.value)}
                    onChange={() =>
                      requiresCheckInField.onChange(!requiresCheckInField.value)
                    }
                  />
                  <Checkbox
                    label="requires_contract"
                    checked={Boolean(requiresContractField.value)}
                    onChange={() =>
                      requiresContractField.onChange(
                        !requiresContractField.value
                      )
                    }
                  />
                  <Checkbox
                    label="requires_passport"
                    checked={Boolean(requiresPassport.value)}
                    onChange={() =>
                      requiresPassport.onChange(!requiresPassport.value)
                    }
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
                  onChange={(_, value) => {
                    eventType.onChange(value);
                  }}
                  value={eventType.value}
                >
                  <Option value="excursion">excursion</Option>
                  <Option value="tour">tour</Option>
                  <Option value="in_town">in town</Option>
                  <Option value="out_of_town">out of town</Option>
                  <Option value="active_holiday">active holiday</Option>
                  <Option value="music">music</Option>
                  <Option value="workshop">workshop</Option>
                  <Option value="business_breakfast">business breakfast</Option>
                  <Option value="meetup">meetup</Option>
                  <Option value="sport_activity">sport activity</Option>
                  <Option value="gastronomic">gastronomic</Option>
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

export default React.memo(CreateEventScene);
