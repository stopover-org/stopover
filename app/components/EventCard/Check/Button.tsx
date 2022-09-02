import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const Description = styled.p`
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: #84bdf7;
  padding: 12px;
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
`;
type Props = {
  description: string;
};

const Check = ({ description }: Props) => (
  <Wrapper>
    <Description>{description}</Description>
  </Wrapper>
);
export default Check;
