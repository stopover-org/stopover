import React from "react";
import styled from "styled-components";
import Row from "../Row";

const Frame = styled.div<{ width: string; height: string }>`
  position: relative;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  cursor: pointer;
  overflow: hidden;
`;
type Props = {
  width?: string;
  height?: string;
  children: React.ReactElement | React.ReactElement[];
};
const BaseImage = ({ width = "100%", height = "100%", children }: Props) => (
  <Frame width={width} height={height}>
    <Row justifyContent="center" height="100%" width="100%">
      {children}
    </Row>
  </Frame>
);

export default BaseImage;
