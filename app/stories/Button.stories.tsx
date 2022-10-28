import React from 'react';
import Button from "../components/Button";
import icon from "../components/icons/Outline/Brands/Android.svg";

export default {
    title: "Components/Button",
    component: Button,
}

const Template = (args: any) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
    borderRadius: "5px",
    disabled: false,
    children: "press me",
}

export const Icon = Template.bind({})
Icon.args = {
    children: "press me",
    icon: <img src={icon} width="25px" height="25px" alt="icon button" />
}