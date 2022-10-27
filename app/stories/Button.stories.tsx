import React from 'react';
import Button from "../components/Button";
import Typography from "../components/Typography";
import icon from "../components/icons/Outline/Brands/Android.svg";
import Image from "next/image";

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
    icon: <Image src={icon.src} width="25px" height="25px" alt="icon button" />
}