import React from "react";
import styled from "styled-components";
import Typography, { Props } from "../components/Typography";
import Row from "../components/Row";
import Column from "../components/Column";
import { TypographySize, TypographyTags } from "../components/StatesEnum";

const TypographyPadding = styled.div`
  padding-bottom: 5px;
`;

export default {
  title: "Components/Typography",
  component: Typography,
  argTypes: {
    color: { control: "color" },
  },
};

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
export const DesignPreview = Preview;
DesignPreview.args = {
  children: "",
  color: "",
  size: "",
  as: "",
  fontWeight: "",
  strikeThrough: "",
  italic: "",
  underline: "",
  lineHeight: "",
};

DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};

const Template = (args: Props) => <Typography {...args} />;
export const Default = Template.bind({});
Default.args = {
  children: "Header",
  color: "black",
  size: "12px",
  as: "span",
  fontWeight: "300",
  strikeThrough: false,
  italic: false,
  underline: false,
  lineHeight: "1.2em",
};
