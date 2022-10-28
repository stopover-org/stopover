import React from 'react';
import Checkbox from "../components/Checkbox";

export default {
    title: "Components/Checkbox",
    component: Checkbox,
}

const Template = (args: any) => <Checkbox {...args} />

export const Default = Template.bind({})
Default.args = {
}