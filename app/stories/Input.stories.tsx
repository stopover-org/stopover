import React from 'react';
import styled from "styled-components";
import Typography from '../components/Typography';
import Row from "../components/Row";
import Column from "../components/Column";
import icon from "../components/icons/Outline/Interface/Search.svg"
import Input, { Props } from "../components/Input";
import { TypographySize, TypographyTags, IconPosition, InputVariants } from "../components/StatesEnum";

const InputSize = styled.div`
    width: 180px;
    padding-bottom: 10px;
    padding-right: 10px;
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


const Preview = () =><Row>
    <Column>
        <InputSize>
            <Input
                value="Забронировать"
            />
        </InputSize>
        <InputSize>
                <Input 
                    placeholder="Placeholder"
                />
        </InputSize>
        <InputSize>
            <Input 
                value="Забронировать"
                errorMessage={
                    <Typography
                        size={TypographySize.MEDIUM}
                        as={TypographyTags.MEDIUM}
                    >
                        You have some error
                    </Typography>
                }
            />
        </InputSize>
        <InputSize>
            <Input 
                value="Забронировать"
                hint={
                    <Typography
                        size={TypographySize.MEDIUM}
                        as={TypographyTags.MEDIUM}
                    >
                        Some message, very important, and very long
                    </Typography>
                }
            />
        </InputSize>
        <InputSize>
            <Input 
                value="Забронировать"
                hint={
                    <Typography
                        size={TypographySize.MEDIUM}
                        as={TypographyTags.MEDIUM}
                    >
                        Some message, very important, and very long
                    </Typography>
                }
            />
        </InputSize>
        <InputSize>
            <Input 
                value="Забронировать"
                label={
                    <Typography
                        size={TypographySize.MEDIUM}
                        as={TypographyTags.MEDIUM}
                    >
                        Input Label
                    </Typography>
                }
            />
        </InputSize>
        <InputSize>
            <Input 
                value="Забронировать"
                icon={icon}
                label={
                    <Typography
                        size={TypographySize.MEDIUM}
                        as={TypographyTags.MEDIUM}
                    >
                        Search
                    </Typography>
                }
            />
        </InputSize>
        <InputSize>
            <Input 
                value="Забронировать"
                icon={icon}
                iconPosition={IconPosition.RIGHT}
                label={
                    <Typography
                        size={TypographySize.MEDIUM}
                        as={TypographyTags.MEDIUM}
                    >
                        Search
                    </Typography>
                }
            />
        </InputSize>
        <InputSize>
            <Input 
                value="Забронировать"
                icon={icon}
                iconPosition={IconPosition.RIGHT}
                variant={InputVariants.OUTLINED}
                label={
                    <Typography
                        size={TypographySize.MEDIUM}
                        as={TypographyTags.MEDIUM}
                    >
                        Search
                    </Typography>
                }
            />
        </InputSize>
        <InputSize>
            <Input
                value="Забронировать"
                icon={icon}
                label={
                    <Typography
                        size={TypographySize.MEDIUM}
                        as={TypographyTags.MEDIUM}
                    >
                        Search
                    </Typography>
                }
            />
        </InputSize>
    </Column>


    <Column>
        <InputSize>
            <Input
                value="123"
                type="number"
            />
        </InputSize>
        <InputSize>
                <Input 
                    placeholder="Placeholder"
                />
        </InputSize>
        <InputSize>
            <Input 
                value="123"
                type="number"
                errorMessage={
                    <Typography
                        size={TypographySize.MEDIUM}
                        as={TypographyTags.MEDIUM}
                    >
                        You have some error
                    </Typography>
                }
            />
        </InputSize>
        <InputSize>
            <Input 
                value="123"
                type="number"
                hint={
                    <Typography
                        size={TypographySize.MEDIUM}
                        as={TypographyTags.MEDIUM}
                    >
                        Some message, very important, and very long
                    </Typography>
                }
            />
        </InputSize>
        <InputSize>
            <Input 
                value="123"
                type="number"
                hint={
                    <Typography
                        size={TypographySize.MEDIUM}
                        as={TypographyTags.MEDIUM}
                    >
                        Some message, very important, and very long
                    </Typography>
                }
            />
        </InputSize>
        <InputSize>
            <Input 
                value="123"
                type="number"
                label={
                    <Typography
                        size={TypographySize.MEDIUM}
                        as={TypographyTags.MEDIUM}
                    >
                        Input Label
                    </Typography>
                }
            />
        </InputSize>
        <InputSize>
            <Input 
                value="123"
                type="number"
                icon={icon}
                label={
                    <Typography
                        size={TypographySize.MEDIUM}
                        as={TypographyTags.MEDIUM}
                    >
                        Search
                    </Typography>
                }
            />
        </InputSize>
        <InputSize>
            <Input 
                value="123"
                type="number"
                icon={icon}
                iconPosition={IconPosition.RIGHT}
                label={
                    <Typography
                        size={TypographySize.MEDIUM}
                        as={TypographyTags.MEDIUM}
                    >
                        Search
                    </Typography>
                }
            />
        </InputSize>
        <InputSize>
            <Input 
                value="123"
                type="number"
                icon={icon}
                iconPosition={IconPosition.RIGHT}
                variant={InputVariants.OUTLINED}
                label={
                    <Typography
                        size={TypographySize.MEDIUM}
                        as={TypographyTags.MEDIUM}
                    >
                        Search
                    </Typography>
                }
            />
        </InputSize>
        <InputSize>
            <Input
                value="123"
                type="number"
                icon={icon}
                label={
                    <Typography
                        size={TypographySize.MEDIUM}
                        as={TypographyTags.MEDIUM}
                    >
                        Search
                    </Typography>
                }
            />
        </InputSize>
    </Column>
</Row>
export const DesignPreview = Preview
DesignPreview.parameters = {
    controls: { hideNoControlsWarning: true }
}

const Template = (args: Props) => <InputSize><Input {...args} /></InputSize>
export const Default = Template.bind({})
Default.args = {
    value: "text",
    id: "your_uniq_id",
    size: "0px",
    type: "text",
    icon: "",
    minValue: undefined,
    maxValue: 0,
    IconPosition: IconPosition.LEFT,
    variant: InputVariants.COMMON,
    disabled: false,
    label: "my_label",
    hint: "my_hint",
    errorMessage: "",
}