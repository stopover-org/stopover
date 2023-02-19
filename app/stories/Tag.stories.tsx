import React from "react";
import styled from "styled-components";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Tag, { TagProps } from "../components/Tag";
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
} as ComponentMeta<typeof Tag>;

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

export const DesignPreview: ComponentStory<typeof Preview> = Preview.bind({});
DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};

const Template = (args: TagProps) => <Tag {...args} />;
export const Default: ComponentStory<typeof Tag> = Template.bind({});
Default.args = {
  children: "6 June",
  variant: TagType.FULFILLED,
  size: TagSizes.NONE,
  href: "#",
};
