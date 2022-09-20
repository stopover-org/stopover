import React from "react";
import styled from "styled-components";

const Frame = styled.div<{ width: string; height: string }>`
  position: relative;
  height: ${(props) => props.height || "100%"};
  width: ${(props) => props.width || "100%"};
  cursor: pointer;
  overflow: hidden;
`;

const Image = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type Props = {
  width: string;
  height?: string;
  children: React.ReactElement;
};
const BaseImage = ({ width, height = "auto", children }: Props) => (
  <Frame width={width} height={height}>
    <Image>{children}</Image>
  </Frame>
);

export default BaseImage;
