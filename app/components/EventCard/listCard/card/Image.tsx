import React from "react";
import styled from "styled-components";

const ImageStyle = styled.img`
  display: block;
  position: absolute;
  width: 100%;
  min-width: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type Props = {
  image: string;
};

function Image(props: Props) {
  return <ImageStyle src={props.image} />;
}
export default Image;
