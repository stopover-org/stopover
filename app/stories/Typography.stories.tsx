import React from 'react';
import Typography from "../components/Typography";

export default {
    title: "Components/Typography",
    component: Typography,
    argTypes: {color: { control: "color" } }
}

const Template = (args: any) => <Typography {...args} />

export const Default = Template.bind({})
Default.args = {
    children: "Header",
    color: "black",
    size: "12px",
    as: "span",
    fontWeight: 300,
    strikeThrough: false,
    italic: false,
    underline: false,
    lineHeight: "1.2em",
}