import React from "react";
import styled from "styled-components";
import icon from "../../../icons/Outline/Status/Pin.svg";

const Wrapper = styled.div`
  padding: 0px 0px 0px 0px;
  display: flex;
  flex-direction: row;
`;

const Icon = styled.img`
  background-color: black;
  border-radius: 50%;
  padding: 2px;
  width: 25px;
  height: 25px;
`;

const HelpText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 212px;
  height: 59px;
  position: absolute;
  top: 0px;
  color: white;
  background-color: black;
  border-radius: 5px;
  z-index: 1;
  opacity: 0;
  pointer-events: none;
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
  }
  ::before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    background-color: black;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    z-index: -1;
  }
`;

const IconContainer = styled.label`
  margin-left: 5px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 25px;
  height: 25px;
  :hover .text {
    opacity: 1;
    pointer-events: auto;
    top: 35px;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
`;

const Text = styled.p`
  font-size: 24px;
`;

type Props = {
  text: string;
  content: string;
};

function Search(props: Props) {
  return (
    <Wrapper>
      <Text>{props.content}</Text>
      <IconContainer>
        <HelpText className="text">
          <p>{props.text}</p>
        </HelpText>
        <Icon src={icon.src} />
      </IconContainer>
    </Wrapper>
  );
}

export default Search;
