import React from "react";
import styled from "styled-components";
import Tag from "../components/Tag";
import Row from "../components/Row";
import Column from "../components/Column";
import { TagSizes, TagType } from "../components/StatesEnum";

const Wrapper = styled.div`
  margin: 5px;
`;

export default {
  title: "Components/Tag",
  component: Tag,
  argTypes: {
    children: { control: "text" },
    variant: { control: "select" },
    size: { control: "select" },
    href: { control: "text" },
  },
};

const Preview = () => (
  <Row>
    <Column>
      <Wrapper>
        <Tag size={TagSizes.SMALL} variant={TagType.OUTLINED}>
          6 June
        </Tag>
      </Wrapper>
      <Wrapper>
        <Tag size={TagSizes.MEDIUM} variant={TagType.OUTLINED}>
          6 June
        </Tag>
      </Wrapper>
      <Wrapper>
        <Tag size={TagSizes.LARGE} variant={TagType.OUTLINED}>
          6 June
        </Tag>
      </Wrapper>
      <Wrapper>
        <Tag size={TagSizes.SMALL} variant={TagType.FULFILLED}>
          6 June
        </Tag>
      </Wrapper>
      <Wrapper>
        <Tag size={TagSizes.MEDIUM} variant={TagType.FULFILLED}>
          6 June
        </Tag>
      </Wrapper>
      <Wrapper>
        <Tag size={TagSizes.LARGE} variant={TagType.FULFILLED}>
          6 June
        </Tag>
      </Wrapper>
    </Column>
  </Row>
);

export const DesignPreview = Preview.bind({});
DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};

const Template = (args: Props) => <Tag {...args} />;
export const Default = Template.bind({});
Default.args = {
  children: "6 June",
  variant: TagType.FULFILLED,
  size: TagSizes.NONE,
  href: "#",
};
