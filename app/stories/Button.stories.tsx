import React from 'react';
import Button from "../components/Button";
import Typography from "../components/Typography";

export default {
    title: "Components/Button",
    component: "Button",
    argTypes: {
        disabled: { control: "boolean" },
        color: { control: "text"},
    },
}

export const Default = (args) => <Button {...args} ><Typography>Press me</Typography></Button>
Default.args = {
    disabled: false,
    color: "black",
}

export const Disabled = () => <Button disabled><Typography>Press me</Typography></Button>