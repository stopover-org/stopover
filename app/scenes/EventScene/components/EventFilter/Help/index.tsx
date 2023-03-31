import React from "react";
import styled from "styled-components";
import Typography from "../../../../../components/v1/Typography";
import { TypographySize } from "../../../../../components/StatesEnum";
import Row from "../../../../../components/Layout/Row";

const Wrapper = styled.div`
  padding: 0px 0px 0px 0px;
  display: flex;
  flex-direction: row;
`;

const Icon = styled(Row)`
  background-color: black;
  border-radius: 50%;
  padding: 2px;
  min-width: 25px;
  min-height: 25px;
  color: white;
  font-weight: 700;
`;

const HelpText = styled(Row)`
  min-width: 200px;
  height: unset;
  padding: 10px;
  position: absolute;
  top: 0px;
  color: white;
  background-color: black;
  border-radius: 5px;
  z-index: 1;
  opacity: 0;
  pointer-events: none;
`;

const IconContainer = styled(Row)`
  margin-left: 5px;
  position: relative;
  width: 25px;
  height: 25px;
  :hover ${HelpText} {
    opacity: 1;
    pointer-events: auto;
    top: 35px;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
`;

type Props = {
  text: string;
  content: string;
};

const Search = (props: Props) => (
  <Wrapper>
    <Typography size={TypographySize.H3}>{props.content}</Typography>
    <IconContainer justifyContent="center">
      <HelpText>
        <Typography>{props.text}</Typography>
      </HelpText>
      <Icon justifyContent="center">?</Icon>
    </IconContainer>
  </Wrapper>
);

export default Search;
