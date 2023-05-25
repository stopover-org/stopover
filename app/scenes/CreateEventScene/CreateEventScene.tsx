import {
  AspectRatio,
  Box,
  Divider,
  Grid,
  Option,
  Stack,
  styled,
  useTheme,
} from "@mui/joy";
import React from "react";
import { useMediaQuery } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Typography from "../../components/v2/Typography";
import Input from "../../components/v2/Input";
import SideBar from "../FirmScene/components/SideBar";
import { useCreateEventForm } from "./useCreateEventForm";
import FileUploader from "../../components/v2/FileUploader/FileUploader";
import Checkbox from "../../components/v2/Checkbox";
import Select from "../../components/v2/Select";
import TextArea from "../../components/v2/TextArea";

const ContentWrapper = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    maxWidth: "calc(100vw - 260px)",
  },
}));

const CreateEventScene = () => {
  const form = useCreateEventForm();
  const imagesField = form.useFormField("image");
  const theme = useTheme();
  const showSidebar = useMediaQuery(theme.breakpoints.up("md"));
  const [currency, setCurrency] = React.useState("dollar");
  const minutes = React.useMemo(() => Array.from(Array(60).keys()), []);
  const hours = React.useMemo(() => Array.from(Array(24).keys()), []);

  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingLeft: "20px", paddingRight: "20px" }}
    >
      {showSidebar && (
        <Grid xs={4} container width="250px">
          <SideBar />
        </Grid>
      )}

      <ContentWrapper
        md={10}
        sm={12}
        container
        sx={{
          paddingTop: showSidebar ? "7px" : "20px",
          paddingLeft: showSidebar ? "60px" : "0",
          minWidth: "calc(100wv - 250px)",
        }}
      >
        <Grid xs={12}>
          <Typography level="h3">Event Title</Typography>
        </Grid>
        <Grid xs={12}>
          <Input {...form.useFormField("title")} label="Title" />
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

        <Grid xs={12}>
          <Typography level="h3">Address</Typography>
        </Grid>
        <Grid md={6} sm={12}>
          <Input {...form.useFormField("houseNumber")} label="House Number" />
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
          <Input {...form.useFormField("fullAddress")} label="Full Address" />
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
          <Typography level="h3">Event Requirements</Typography>
        </Grid>
        <Grid xs={12}>
          <Stack>
            <Checkbox
              label="requires_check_in"
              checked={false}
              onChange={() => {}}
            />
            <Checkbox
              label="requires_contract"
              checked={false}
              onChange={() => {}}
            />
            <Checkbox
              label="requires_passport"
              checked={false}
              onChange={() => {}}
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
                  onChange={(_, value) => setCurrency(value!)}
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
      </ContentWrapper>
    </Grid>
  );
};

export default React.memo(CreateEventScene);
