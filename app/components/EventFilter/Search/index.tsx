import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import editSvg from "../../icons/Outline/Interface/Edit-alt.svg";
import searchSvg from "../../icons/Outline/Interface/Search.svg";

const ImageWrapper = styled.div<{ left: string; bottom: string }>`
  display: none;
  position: relative;
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
`;

const SImage = styled(Image)``;

const Input = styled.input<{ width: string; padding?: string }>`
  border: none;
  border-bottom: 2px solid transparent;
  background-color: transparent;
  font-size: 32px;
  font-weight: 400;
  line-height: 44px;
  width: ${(props) => props.width};
  opacity: 0.3;
  ${({ padding }) => padding && `padding-right: ${padding};`}
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
  width: string;
  placeHolder: string;
  helpText: string;
  value?: string;
};

const Search = (props: Props) => {
  const [value, setValue] = useState(props.value);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <Wrapper>
      <HelpMessage>{value === "" ? "" : props.helpText}</HelpMessage>
      <div>
        <Input
          placeholder={props.placeHolder}
          width={props.width}
          value={value}
          onChange={(e) => onChange(e)}
          padding={props.searchType === "event" ? "50px" : undefined}
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
};

export default Search;
