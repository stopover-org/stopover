import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CssVarsProvider, Divider, Grid } from "@mui/joy";
import { CalendarMonthTwoTone } from "@mui/icons-material";
import Input from "components/v2/Input";
import { theme } from "lib/theme";
import PhoneInput from "components/v2/PhoneInput";
import ChipsInput from "components/v2/ChipsInput";
import TextArea from "components/v2/TextArea";

const Preview = () => {
  const [phone, setPhone] = React.useState("");
  const phoneInputOnChange = (value: string) => setPhone(value);
  const onChange = () => {};
  const [chips, setChips] = React.useState("");
  return (
    <CssVarsProvider theme={theme}>
      <Grid container spacing={2} xs={12}>
        {/* Common Inputs */}
        <Grid container xs={6}>
          <Grid xs={12}>
            <Input onChange={onChange} value="Забронировать" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="" placeholder="Placeholder" />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="Забронировать"
              error="You have some error"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="Забронировать"
              hint="Some message, very important, and very long"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="Забронировать"
              hint="Some message, very important, and very long"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="Забронировать"
              label="Input label"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="ATV"
              startDecorator={<CalendarMonthTwoTone />}
              label="Забронировать"
            />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="ATV" label="Забронировать" />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="Забронировать"
              endDecorator={<CalendarMonthTwoTone />}
              variant="outlined"
              label="Search"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="ATV"
              startDecorator={<CalendarMonthTwoTone />}
              label="Забронировать"
            />
          </Grid>
        </Grid>

        {/* Number Inputs */}
        <Grid container xs={6}>
          <Grid xs={12}>
            <Input onChange={onChange} value="123" type="number" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="" placeholder="Placeholder" />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="123"
              type="number"
              error="You have some error"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="123"
              type="number"
              hint="Some message, very important, and very long"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="123"
              type="number"
              hint="Some message, very important, and very long"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="123"
              type="number"
              label="Input Label"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="123"
              type="number"
              startDecorator={<CalendarMonthTwoTone />}
              label="Search"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="123"
              type="number"
              endDecorator={<CalendarMonthTwoTone />}
              label="Search"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="123"
              type="number"
              endDecorator={<CalendarMonthTwoTone />}
              variant="outlined"
              label="Search"
            />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="123"
              type="number"
              startDecorator={<CalendarMonthTwoTone />}
              label="Search"
            />
          </Grid>
        </Grid>

        <Grid xs={12}>
          <Divider />
        </Grid>

        {/* Input sizes */}
        <Grid container xs={6}>
          <Grid xs={12}>
            <Input onChange={onChange} value="default size" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="small size" size="sm" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="small size" size="md" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="small size" size="lg" />
          </Grid>
        </Grid>

        {/* Input Variants */}
        <Grid container xs={6}>
          <Grid xs={12}>
            <Input onChange={onChange} value="default variant" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="plain variant" variant="plain" />
          </Grid>
          <Grid xs={12}>
            <Input
              onChange={onChange}
              value="outlined variant"
              variant="outlined"
            />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="soft variant" variant="soft" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="solid variant" variant="solid" />
          </Grid>
        </Grid>

        <Grid xs={12}>
          <Divider />
        </Grid>

        {/* Different Palettes Input */}
        <Grid container xs={6}>
          <Grid xs={12}>
            <Input onChange={onChange} value="default color" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="primary color" color="primary" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="neutral color" color="neutral" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="danger color" color="danger" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="success color" color="success" />
          </Grid>
          <Grid xs={12}>
            <Input onChange={onChange} value="warning color" color="warning" />
          </Grid>
        </Grid>

        {/* Phone Input */}
        <Grid container xs={6}>
          <Grid xs={12}>
            <PhoneInput
              value={phone}
              onChange={phoneInputOnChange}
              placeholder="Choose country"
              label="გამარჯობა"
            />
          </Grid>
        </Grid>

        <Grid xs={12}>
          <Divider />
        </Grid>

        <Grid xs={12}>
          <Grid xs={4}>
            <ChipsInput
              value={chips}
              onChange={setChips}
              label="Input with chips"
              hint="it should inherit props from common input"
            />
          </Grid>
        </Grid>

        <Grid xs={12}>
          <Divider />
        </Grid>

        <Grid xs={12}>
          <Grid xs={4}>
            <TextArea
              value={chips}
              onChange={setChips}
              label="TextAream"
              hint="it should have 6 rows"
              minRows={6}
              maxRows={12}
            />
          </Grid>
        </Grid>
      </Grid>
    </CssVarsProvider>
  );
};

export default {
  title: "Components/v2/Input",
  component: Preview,
} as Meta<typeof Input>;

export const DesignPreview: StoryObj<typeof Preview> = {
  args: {
    controls: { hideNoControlsWarning: true },
  },
};
