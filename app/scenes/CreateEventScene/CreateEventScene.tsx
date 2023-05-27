import {
  AspectRatio,
  Box,
  Divider,
  Grid,
  ListItem,
  Option,
  Stack,
} from "@mui/joy";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import List from "@mui/joy/List";
import { FormProvider } from "react-hook-form";
import Typography from "../../components/v2/Typography";
import Input from "../../components/v2/Input";
import { useCreateEventForm } from "./useCreateEventForm";
import FileUploader from "../../components/v2/FileUploader/FileUploader";
import Checkbox from "../../components/v2/Checkbox";
import Select from "../../components/v2/Select";
import TextArea from "../../components/v2/TextArea";
import Breadcrumbs from "../../components/v2/Breadcrumbs/Breadcrumbs";

const CreateEventScene = () => {
  const form = useCreateEventForm();
  const imagesField = form.useFormField<string[]>("images");
  const [currency, setCurrency] = React.useState("dollar");
  const minutes = React.useMemo(() => Array.from(Array(60).keys()), []);
  const hours = React.useMemo(() => Array.from(Array(24).keys()), []);
  const requiresCheckInField = form.useFormField("requiresCheckIn");
  const requiresContractField = form.useFormField("requiresContract");
  const requiresPassport = form.useFormField("requiresPassport");

  return (
    <>
      <Breadcrumbs
        items={[{ title: "My Firm", href: "/my-firm" }, "New Event"]}
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit()}>
          <Grid container spacing={2} md={8} sm={12}>
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
              <Stack flexDirection="row">
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
              <Typography level="h3">Address</Typography>
            </Grid>
            <Grid md={6} sm={12}>
              <Input
                {...form.useFormField("houseNumber")}
                label="House Number"
              />
            </Grid>
            <Grid md={6} sm={12}>
              <Input {...form.useFormField("street")} label="Street" />
            </Grid>
            <Grid md={6} sm={12}>
              <Input {...form.useFormField("city")} label="City" />
            </Grid>
            <Grid md={6} sm={12}>
              <Input {...form.useFormField("country")} label="Country" />
            </Grid>
            <Grid md={6} sm={12}>
              <Input {...form.useFormField("region")} label="Region" />
            </Grid>
            <Grid md={6} sm={12}>
              <Input
                {...form.useFormField("fullAddress")}
                label="Full Address"
              />
            </Grid>

            <Grid xs={12}>
              <Typography level="h3">Time</Typography>
            </Grid>
            <Grid xs={12} container>
              <Grid xs={2}>
                <Select defaultValue={0} label="Hours">
                  {hours.map((hour, index) => (
                    <Option key={index}>{hour}</Option>
                  ))}
                </Select>
              </Grid>
              <Grid xs={2}>
                <Select defaultValue={0} label="Minutes">
                  {minutes.map((minute, index) => (
                    <Option key={index}>{minute}</Option>
                  ))}
                </Select>
              </Grid>
            </Grid>

            <Grid xs={12}>
              <Typography level="h3">Days event</Typography>
            </Grid>
            <Grid xs={12}>
              <List>
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday ",
                  "Sunday",
                ].map((day, index) => (
                  <ListItem>
                    <Checkbox
                      key={index}
                      color="primary"
                      overlay
                      disableIcon
                      variant="soft"
                      label={day}
                      onChange={() => {}}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>

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
                    requiresContractField.onChange(!requiresContractField.value)
                  }
                />
                <Checkbox
                  label="requires_passport"
                  checked={Boolean(requiresPassport.value)}
                  onChange={() =>
                    requiresPassport.onChange(!requiresPassport.value)
                  }
                />
                <Checkbox
                  label="requires_prepaid"
                  checked={false}
                  onChange={() => {}}
                />
              </Stack>
            </Grid>

            <Grid xs={12}>
              <Typography level="h3">Event Type</Typography>
            </Grid>
            <Grid xs={12}>
              <Select
                defaultValue="active_holiday"
                label="Type of Event"
                placeholder="Select Type"
              >
                <Option>excursion</Option>
                <Option>tour</Option>
                <Option>in_town</Option>
                <Option>out_of_town</Option>
                <Option>active_holiday</Option>
                <Option>music</Option>
                <Option>workshop</Option>
                <Option>business_breakfast</Option>
                <Option>meetup</Option>
                <Option>sport_activity</Option>
                <Option>gastronomic</Option>
              </Select>
            </Grid>

            <Grid container>
              <Grid xs={12}>
                <Typography level="h3">Attendees</Typography>
              </Grid>
              <Grid xs={6}>
                <Input
                  type="number"
                  label="maximum attendees"
                  defaultValue={1}
                  slotProps={{
                    input: {
                      min: 0,
                      step: 1,
                    },
                  }}
                />
              </Grid>

              <Grid xs={6}>
                <Input
                  type="number"
                  label="minimum attendees"
                  defaultValue={1}
                  slotProps={{
                    input: {
                      min: 0,
                      step: 1,
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Grid xs={12}>
              <Input
                placeholder="Amount"
                startDecorator={{ dollar: "$" }[currency]}
                endDecorator={
                  <>
                    <Divider orientation="vertical" />
                    <Select
                      variant="plain"
                      value={currency}
                      onChange={(_, value) => setCurrency(value as string)}
                      sx={{ mr: -1.5, "&:hover": { bgcolor: "transparent" } }}
                    >
                      <Option value="dollar">US dollar</Option>
                    </Select>
                  </>
                }
                label="Organizer Price"
                sx={{ width: 300 }}
              />
            </Grid>

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
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default React.memo(CreateEventScene);
