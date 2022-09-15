import React from "react";
import styled from "styled-components";

const Wrapper = styled.div<{
  justifyContent: string;
  alignItems: string;
  paddingLeft: string;
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  padding: string;
}>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  padding-left: ${(props) => props.paddingLeft};
  padding-top: ${(props) => props.paddingTop};
  padding-right: ${(props) => props.paddingRight};
  padding-bottom: ${(props) => props.paddingBottom};
  padding: ${(props) => props.padding};
`;

type Props = {
  children: React.ReactElement;
  justifyContent?: string;
  alignItems?: string;
  paddingLeft?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  padding?: string;
};

const Row = ({
  children,
  justifyContent = "center",
  alignItems = "center",
  paddingLeft = "0px",
  paddingTop = "0px",
  paddingRight = "0px",
  paddingBottom = "0px",
  padding = "0px",
}: Props) => (
  <Wrapper
    justifyContent={justifyContent}
    alignItems={alignItems}
    paddingLeft={paddingLeft}
    paddingTop={paddingTop}
    paddingRight={paddingRight}
    paddingBottom={paddingBottom}
    padding={padding}
  >
    {children}
  </Wrapper>
);

export default Row;
