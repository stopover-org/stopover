import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 6px 6px 6px 0px;
`;
const Description = styled.p`
  border: 1px solid black;
  white-space: normal;
  word-wrap: break-word;
`;

type Props = {
  description: string;
};

const DetailedInformation = ({ description }: Props) => (
  <Wrapper>
    <Description>{description}</Description>
  </Wrapper>
);

export default DetailedInformation;
/*
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
*/
