import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;
const DottedDiv = styled.div<{ height: number }>`
  position: relative;
  min-width: 100px;
  width: 100%;
  height: ${(props) => props.height}px;
  background-color: #c2e0fe;
  border-bottom: 5px dashed white;
`;
const Div = styled.div<{ height: number }>`
  min-width: 100px;
  width: 100%;
  height: ${(props) => props.height}px;
  background-color: #c2e0fe;
`;
const LeftHalfCircle = styled.div<{ height: number; width: number }>`
  position: absolute;
  left: 0px;
  top: 0px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: white;
  border-radius: 0px 110px 110px 0px;
`;
const RightHalfCircle = styled.div<{ height: number; width: number }>`
  position: absolute;
  right: 0px;
  top: 0px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: white;
  border-radius: 110px 0px 0px 110px;
`;

type Props = {
  height: number;
};

const CheckConnect = ({ height }: Props) => (
  <Wrapper>
    <DottedDiv height={height / 2 + 2.5}>
      <LeftHalfCircle height={height} width={height / 2} />
      <RightHalfCircle height={height} width={height / 2} />
    </DottedDiv>
    <Div height={height / 2 - 2.5} />
  </Wrapper>
);
export default CheckConnect;
