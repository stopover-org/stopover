import React from "react";
import styled from "styled-components";
import Typography from "../../components/Typography";
import Tag from "../../components/Tag";
import icon from "../../components/icons/Outline/Brands/Chrome.svg";

const Wrapper = styled.div`
  width: 200px;
`;

const TagsTest = () => (
  <Wrapper>
    <Tag image={icon.src} content={<Typography>hi its johny</Typography>} />
  </Wrapper>
);

export default TagsTest;
