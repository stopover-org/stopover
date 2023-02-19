import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Typography from "../components/Typography";
import Button, { Props } from "../components/Button";
import Row from "../components/Row";
import Column from "../components/Column";
import icon from "../components/icons/Outline/General/Calendar.svg";
import {
  ButtonIconPlace,
  ButtonSizes,
  ButtonVariants,
} from "../components/StatesEnum";

const SButton = styled(Button)`
  margin-bottom: 10px;
  margin-right: 25px;
`;

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    children: { control: "text" },
    icon: { control: "object" },
    variant: { control: "select" },
    iconPosition: { control: "select" },
    color: { control: "color" },
    backgroundColor: { control: "color" },
    size: { control: "select" },
    disabled: { control: "boolean" },
    borderRadius: { control: "text" },
  },
} as ComponentMeta<typeof Button>;

const Preview = () => (
  <Row>
    <Column>
      <SButton size={ButtonSizes.MEDIUM}>
        <Typography size="18px">Забронировать</Typography>
      </SButton>
      <SButton
        size={ButtonSizes.MEDIUM}
        icon={<Image src={icon} width="28px" height="28px" alt="icon button" />}
        iconPosition={ButtonIconPlace.WITH_RIGHT_ICON}
      >
        <Typography size="18px">Забронировать</Typography>
      </SButton>
      <SButton
        size={ButtonSizes.MEDIUM}
        icon={<Image src={icon} width="28px" height="28px" alt="icon button" />}
        color="white"
      >
        <Typography size="18px">Забронировать</Typography>
      </SButton>
      <SButton
        size={ButtonSizes.MEDIUM}
        icon={<Image src={icon} width="28px" height="28px" alt="icon button" />}
        disabled
      >
        <Typography size="18px">Забронировать</Typography>
      </SButton>
    </Column>

    <Column>
      <SButton size={ButtonSizes.MEDIUM} variant={ButtonVariants.OUTLINED}>
        <Typography size="18px">Забронировать</Typography>
      </SButton>
      <SButton
        size={ButtonSizes.MEDIUM}
        icon={<Image src={icon} width="28px" height="28px" alt="icon button" />}
        iconPosition={ButtonIconPlace.WITH_RIGHT_ICON}
        variant={ButtonVariants.OUTLINED}
      >
        <Typography size="18px">Забронировать</Typography>
      </SButton>
      <SButton
        size={ButtonSizes.MEDIUM}
        icon={<Image src={icon} width="28px" height="28px" alt="icon button" />}
        disabled
        variant={ButtonVariants.OUTLINED}
      >
        <Typography size="18px">Забронировать</Typography>
      </SButton>
    </Column>

    <Column>
      <SButton size={ButtonSizes.SMALL}>
        <Typography size="18px">Забронировать</Typography>
      </SButton>
      <SButton size={ButtonSizes.MEDIUM}>
        <Typography size="18px">Забронировать</Typography>
      </SButton>
      <SButton size={ButtonSizes.LARGE}>
        <Typography size="18px">Забронировать</Typography>
      </SButton>
    </Column>
  </Row>
);
export const DesignPreview: ComponentStory<typeof Preview> = Preview;
DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};

const Template = (args: Props) => <Button {...args} />;
export const Default: ComponentStory<typeof Button> = Template.bind({});
Default.args = {
  children: "Press me",
  icon: <Image src={icon} width="28px" height="28px" alt="icon button" />,
  variant: ButtonVariants.COMMON,
  iconPosition: ButtonIconPlace.WITH_LEFT_ICON,
  color: "white",
  backgroundColor: "#FF8A00",
  size: ButtonSizes.MEDIUM,
  disabled: false,
  borderRadius: "5px",
};
