import React from "react";
import styled from "styled-components";
import Row from "../Layout/Row";
import Typography from "../v1/Typography";

const SDescription = styled(Row)<{ background: string }>`
  overflow-y: scroll;
  position: sticky;
  top: 20px;
  background-color: ${(props) => props.background};
`;
const Context = styled.div``;

export type DescriptionProps = {
  height: string;
  text: string;
  background: string;
};

const Description = ({ height, text, background }: DescriptionProps) => (
  <SDescription
    height={height}
    border="1px solid black"
    padding="0 5px 0 5px"
    background={background}
  >
    <Typography size="16px">
      <Context dangerouslySetInnerHTML={{ __html: text }} />
    </Typography>
  </SDescription>
);

export default Description;
