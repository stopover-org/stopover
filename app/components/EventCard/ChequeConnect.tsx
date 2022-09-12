import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;
const DottedDiv = styled.div<{ height: number; color: string }>`
  position: relative;
  min-width: 100px;
  width: 100%;
  height: ${(props) => props.height}px;
  //background-color: #c2e0fe;
  border-bottom: 2px dashed ${(props) => props.color};
`;
const Div = styled.div<{ height: number }>`
  min-width: 100px;
  width: 100%;
  height: ${(props) => props.height}px;
  //background-color: #c2e0fe;
`;
const LeftHalfCircle = styled.div<{
  height: number;
  width: number;
  color: string;
}>`
  position: absolute;
  left: 0px;
  top: 0px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: white;
  border-radius: 0px 110px 110px 0px;
  border-right: 1px solid ${(props) => props.color};
  border-top: 1px solid ${(props) => props.color};
  border-bottom: 1px solid ${(props) => props.color};
`;
const RightHalfCircle = styled.div<{
  height: number;
  width: number;
  color: string;
}>`
  position: absolute;
  right: 0px;
  top: 0px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: white;
  border-radius: 110px 0px 0px 110px;

  border-left: 1px solid ${(props) => props.color};
  border-top: 1px solid ${(props) => props.color};
  border-bottom: 1px solid ${(props) => props.color};
`;

const ChequeConnect = ({ color }: { color: string }) => {
  const height = 50;
  return (
    <Wrapper>
      <DottedDiv height={height / 2 + 2.5} color={color}>
        <LeftHalfCircle height={height} width={height / 2} color={color} />
        <RightHalfCircle height={height} width={height / 2} color={color} />
      </DottedDiv>
      <Div height={height / 2 - 2.5} />
    </Wrapper>
  );
};
export default ChequeConnect;
