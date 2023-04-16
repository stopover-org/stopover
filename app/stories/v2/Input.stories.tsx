import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CssVarsProvider, Divider, Grid } from "@mui/joy";
import { CalendarMonthTwoTone } from "@mui/icons-material";
import Input from "../../components/v2/Input";
import { theme } from "../../lib/theme";
import PhoneInput from "../../components/v2/PhoneInput";

export default {
  title: "Components/v2/Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Preview = () => {
  const [phone, setPhone] = React.useState("");
  const phoneInputOnChange = (value: string) => setPhone(value);
  const onChange = () => {};
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
            <Input onChange={onChange} value="info color" color="info" />
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
      </Grid>
    </CssVarsProvider>
  );
};
export const DesignPreview: ComponentStory<typeof Preview> = Preview;
DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};
