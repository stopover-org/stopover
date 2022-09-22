import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { SkeletonType } from "../StatesEnum";

const ImageWrapper = styled.div<{
  width?: string;
  height?: string;
}>`
  position: relative;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  overflow: hidden;
  animation: image-loading 1s linear infinite alternate;
  @keyframes image-loading {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }
`;

const SImage = styled.div<{
  imageWidth?: string;
  imageHeight?: string;
  top?: string;
  right?: string;
}>`
  position: absolute;
  width: ${(props) => props.imageWidth || "100%"};
  height: ${(props) => props.imageHeight || "100%"};
  top: ${(props) => props.top || "0px"};
  right: ${(props) => props.right || "0px"};
`;

const SkeletonStyle = styled.div<{
  width?: string;
  height?: string;
  margin?: string;
  border?: string;
  borderRadius?: string;
}>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  margin: ${(props) => props.margin || "0px"};
  border: ${(props) => props.border || "0px solid transparent"};
  border-radius: ${(props) => props.borderRadius || "0px"};
  opacity: 0.7;
  animation: skeleton-loading 1s linear infinite alternate;
  @keyframes skeleton-loading {
    0% {
      background-color: hsl(200, 20%, 70%);
      border-color: hsl(200, 20%, 70%);
    }
    100% {
      background-color: hsl(200, 20%, 95%);
      border-color: hsl(200, 20%, 95%);
    }
  }
`;

type Props = {
  width: string;
  height: string;
  imageWidth?: string;
  imageHeight?: string;
  top?: string;
  right?: string;
  margin?: string;
  border?: string;
  borderRadius?: string;
  image?: string;
  type: SkeletonType;
};

const Skeleton = ({
  type,
  width,
  height,
  margin,
  border,
  borderRadius,
  image,
  imageWidth,
  imageHeight,
  top,
  right,
  ...props
}: Props) => (
  <>
    {type === SkeletonType.IMAGE && (
      <ImageWrapper width={width} height={height}>
        <SImage
          imageWidth={imageWidth}
          imageHeight={imageHeight}
          top={top}
          right={right}
        >
          <Image
            src={image as string}
            width={imageWidth || "100%"}
            height={imageHeight || "100%"}
          />
        </SImage>
      </ImageWrapper>
    )}
    {type === SkeletonType.BLOCK && (
      <SkeletonStyle
        width={width}
        height={height}
        margin={margin}
        border={border}
        borderRadius={borderRadius}
        {...props}
      />
    )}
  </>
);

export default Skeleton;
