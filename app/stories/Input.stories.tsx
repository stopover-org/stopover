import React from 'react';
import Input from "../components/Input";

export default {
    title: "Components/Input",
    component: Input,
}

const Template = (args: any) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
    value: "text",
    id: "your_uniq_id",
    size: "0px",
    type: "text",
    disabled: false,
    label: "",
    hint: "",
    errorMessage: "",
}

export const Number = Template.bind({})
Number.args = {
    value: 5,
    id: "your_uniq_id",
    size: "0px",
    type: "number",
    minValue: 0,
    maxValue: 100,
    disabled: false,
    label: "",
    hint: "",
    errorMessage: "",
}