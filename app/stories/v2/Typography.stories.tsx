import React from "react";
import styled from "styled-components";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Typography, { Props } from "../../components/v2/Typography";
import Row from "../../components/Layout/Row";
import Column from "../../components/Layout/Column";
import { TypographySize, TypographyTags } from "../../components/StatesEnum";

const TypographyPadding = styled.div`
  padding-bottom: 5px;
`;

export default {
  title: "Components/V2/Typography",
  component: Typography,
  argTypes: {
    color: { control: "color" },
  },
} as ComponentMeta<typeof Typography>;

const Preview = () => (
  <Row container>
    <Column>
      <TypographyPadding>
        <Typography size={TypographySize.H1} as={TypographyTags.H1}>
          Header H1
        </Typography>
      </TypographyPadding>
      <TypographyPadding>
        <Typography size={TypographySize.H2} as={TypographyTags.H2}>
          Header H2
        </Typography>
      </TypographyPadding>
      <TypographyPadding>
        <Typography size={TypographySize.H3} as={TypographyTags.H3}>
          Header H3
        </Typography>
      </TypographyPadding>
      <TypographyPadding>
        <Typography size={TypographySize.H4} as={TypographyTags.H4}>
          Header H4
        </Typography>
      </TypographyPadding>
      <TypographyPadding>
        <Typography size={TypographySize.H5} as={TypographyTags.H5}>
          Header H5
        </Typography>
      </TypographyPadding>
      <TypographyPadding>
        <Typography size={TypographySize.H6} as={TypographyTags.H6}>
          Header H6
        </Typography>
      </TypographyPadding>
      <TypographyPadding>
        <Typography>Default text</Typography>
      </TypographyPadding>
      <TypographyPadding>
        <Typography strikeThrough>Strikethrough text</Typography>
      </TypographyPadding>
      <TypographyPadding>
        <Typography italic>Italic text</Typography>
      </TypographyPadding>
      <TypographyPadding>
        <Typography underline>Underline text</Typography>
      </TypographyPadding>
      <TypographyPadding>
        <Typography fontWeight="700">Bold text</Typography>
      </TypographyPadding>
    </Column>
  </Row>
);
export const DesignPreview: ComponentStory<typeof Preview> = Preview;

DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};

const Template: ComponentStory<typeof Typography> = (args: Props) => (
  <Typography {...args} />
);
export const Default = Template.bind({});
Default.args = {
  children: "Header",
  color: "black",
  size: "12px",
  as: "span" as TypographyTags,
  fontWeight: "300",
  strikeThrough: false,
  italic: false,
  underline: false,
  lineHeight: "1.2em",
};
