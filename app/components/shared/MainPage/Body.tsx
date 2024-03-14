import React from "react";
import styled from "styled-components";

const BodyStyle = styled.div`
  display: flex;
  align-items: center;
`;

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

const Body = (props: Props) => <BodyStyle>{props.children}</BodyStyle>;

export default Body;
