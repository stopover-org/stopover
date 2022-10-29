import React from 'react';
import styled from "styled-components";
import Input, { Props } from "../components/Input";
import { IconPosition, InputVariants } from "../components/StatesEnum";

const InputSize = styled.div`
    width: 180px;
`;

export default {
    title: "Components/Input",
    component: Input,
    argTypes: {
        value: { control: "text" },
        id: { control: "text" },
        size: { control: "text" },
        type: { control: "text" },
        icon: { control: "text" },
        minValue: { control: "number" },
        maxValue: { control: "number" },
        iconPosition: { control: "select" },
        variant: { control: "select" },
        disabled: { control: "boolean" },
        label: { control: "text" },
        hint: { control: "text" },
        errorMessage: { control: "text" },
    }
}

const Template = (args: Props) => <InputSize><Input {...args} /></InputSize>

export const Default = Template.bind({})
Default.args = {
    value: "text",
    id: "your_uniq_id",
    size: "0px",
    type: "text",
    icon: "",
    minValue: 0,
    maxValue: 0,
    IconPosition: IconPosition.LEFT,
    variant: InputVariants.COMMON,
    disabled: false,
    label: "my_label",
    hint: "my_hint",
    errorMessage: "",
}