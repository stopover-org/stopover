import React from 'react';
import Typography from "../components/Typography";

export default {
    title: "Components/Typography",
    component: Typography,
    argTypes: {
        color: { control: "color" },
    }
}

const Preview = () => <>
    <Typography>Header H1</Typography>
    <Typography>Header H2</Typography>
    <Typography>Header H3</Typography>
    <Typography>Header H4</Typography>
    <Typography>Header H5</Typography>
    <Typography>Header H6</Typography>
</>
export const DesignPreview = Preview

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