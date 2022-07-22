import React from "react";
import styled from "styled-components";

const BodyStyle = styled.div`
  display: flex;
  align-items: center;
`;

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

function Body(props: Props) {
  return <BodyStyle>{props.children}</BodyStyle>;
}
export default Body;
