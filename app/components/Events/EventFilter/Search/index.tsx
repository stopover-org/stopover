import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import editSvg from "../../../icons/Outline/Interface/Edit-alt.svg";
import searchSvg from "../../../icons/Outline/Interface/Search.svg";

const ImageWrapper = styled.div<{ left: string; bottom: string }>`
  display: none;
  position: relative;
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
`;

const SImage = styled(Image)``;

const Input = styled.input<{ inputWidth: string }>`
  border: none;
  border-bottom: 2px solid transparent;
  background-color: transparent;
  font-size: 36px;
  font-weight: 400;
  line-height: 44px;
  width: ${(props) => props.inputWidth};
  opacity: 0.3;
  &:focus {
    outline: none;
    border-bottom: 2px solid #d9d9d9;
  }
`;

const HelpMessage = styled.div`
  height: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 30px 0px;
  &:hover ${ImageWrapper} {
    display: inline-block;
  }
  &:hover ${Input} {
    border-bottom: 2px solid #d9d9d9;
  }
`;

type Props = {
  searchType: string;
  inputWidth: string;
  placeHolder: string;
  helpText: string;
};

function Search(props: Props) {
  const [value, setValue] = useState("");
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <Wrapper>
      <HelpMessage className="text">
        {value === "" ? "" : props.helpText}
      </HelpMessage>
      <div>
        <Input
          className="text"
          type="text"
          placeholder={props.placeHolder}
          inputWidth={props.inputWidth}
          value={value}
          onChange={(e) => onChange(e)}
        />

        {props.searchType === "location" && (
          <ImageWrapper left="16px" bottom="-16px">
            <SImage
              src={editSvg.src}
              alt="Picture of the author"
              width={25}
              height={25}
            />
          </ImageWrapper>
        )}

        {props.searchType === "event" && (
          <ImageWrapper left="-45px" bottom="auto">
            <SImage
              src={searchSvg.src}
              alt="Picture of the author"
              width={25}
              height={25}
            />
          </ImageWrapper>
        )}
      </div>
    </Wrapper>
  );
}

export default Search;
