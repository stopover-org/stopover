import React from 'react';
import styled from "styled-components";
import Checkbox, { Props } from "../components/Checkbox";
import Column from '../components/Column';
import Row from "../components/Row";
import { CheckboxSizes, CheckboxType, TypographySize, TypographyTags } from "../components/StatesEnum";
import Typography from '../components/Typography';

const CheckboxPadding = styled.div`
    width: 167px;
    padding-bottom: 5px;
`;

export default {
    title: "Components/Checkbox",
    component: Checkbox,
    argTypes: {
        id: { control: "text" },
        children: { control: "text" },
        disabled: { control: "boolean" },
        type: { control: "select" },
        checked: { control: "boolean" },
        size: { control: "select" },
        animate: { control: "boolean" },
    }
}

const Preview = () => <Row>
    <Column>
        <CheckboxPadding>
            <Checkbox><Typography size={TypographySize.BIG} as={TypographyTags.BIG}>Label for checkbox</Typography></Checkbox>
        </CheckboxPadding>
        <CheckboxPadding>
            <Checkbox checked><Typography size={TypographySize.BIG} as={TypographyTags.BIG}>Label for checkbox</Typography></Checkbox>
        </CheckboxPadding>
        <CheckboxPadding>
            <Checkbox type={CheckboxType.RADIO}><Typography size={TypographySize.BIG} as={TypographyTags.BIG}>Label for checkbox</Typography></Checkbox>
        </CheckboxPadding>
        <CheckboxPadding>
            <Checkbox checked type={CheckboxType.RADIO}><Typography size={TypographySize.BIG} as={TypographyTags.BIG}>Label for checkbox</Typography></Checkbox>
        </CheckboxPadding>
    </Column>

    <Column>
        <CheckboxPadding>
            <Checkbox size={CheckboxSizes.SMALL}><Typography size={TypographySize.H5} as={TypographyTags.H5}>Label for checkbox</Typography></Checkbox>
        </CheckboxPadding>
        <CheckboxPadding>
            <Checkbox size={CheckboxSizes.SMALL} checked><Typography size={TypographySize.H5} as={TypographyTags.H5}>Label for checkbox</Typography></Checkbox>
        </CheckboxPadding>
        <CheckboxPadding>
            <Checkbox size={CheckboxSizes.SMALL} type={CheckboxType.RADIO}><Typography size={TypographySize.H5} as={TypographyTags.H5}>Label for checkbox</Typography></Checkbox>
        </CheckboxPadding>
        <CheckboxPadding>
            <Checkbox size={CheckboxSizes.SMALL} checked type={CheckboxType.RADIO}><Typography size={TypographySize.H5} as={TypographyTags.H5}>Label for checkbox</Typography></Checkbox>
        </CheckboxPadding>
    </Column>
</Row>
export const DesignPreview = Preview
DesignPreview.args = {
    id: "",
    children: "",
    disabled: "",
    type: "",
    checked: "",
    size: "",
    animate: "",
}
DesignPreview.parameters = {
    controls: { hideNoControlsWarning: true }
}

const Template = (args: Props) => <Checkbox {...args} />
export const Default = Template.bind({})
Default.args = {
    id: "your_uniq_id",
    children: "my children",
    disabled: false,
    type: CheckboxType.CHECKBOX,
    checked: false,
    size: CheckboxSizes.MEDIUM,
    animate: false,
}