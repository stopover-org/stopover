import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 12px;
`;

const Header = styled.p`
  text-align: center;
  font-style: normal;
  font-weight: bolder;
  padding-bottom: 12px;
  font-size: 30px;
  line-height: 36px;
`;

const Description = styled.p`
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
`;

type Props = {
  header: string;
  description?: string | number;
};
const Text = ({ header, description }: Props) => (
  <Wrapper>
    <Header>{header}</Header>
    <Description>{description}</Description>
  </Wrapper>
);

export default Text;
