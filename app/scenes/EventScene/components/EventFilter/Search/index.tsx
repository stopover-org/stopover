import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import editSvg from "../../../../../components/icons/Outline/Interface/Edit-alt.svg";
import searchSvg from "../../../../../components/icons/Outline/Interface/Search.svg";
import Column from "../../../../../components/Column";
import {
  TypographySize,
  TypographyWeight,
} from "../../../../../components/StatesEnum";
import Typography from "../../../../../components/Typography";

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
  font-size: ${TypographySize.H2};
  font-weight: ${TypographyWeight.MEDIUM};
  line-height: 44px;
  width: ${(props) => props.width};
  opacity: 0.3;
  ${({ padding }) => padding && `padding-right: ${padding};`}
  color: black;
  &:focus {
    border-bottom: 2px solid #d9d9d9;
  }
`;

const HelpMessage = styled(Typography)`
  height: 16px;
`;

const Wrapper = styled(Column)`
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
  onChange: (val: string) => void;
};

const Search = (props: Props) => {
  const [value, setValue] = useState(props.value);
  const onChange = (e: any) => {
    setValue(e.target.value);

    props.onChange(e.target.value);
  };

  return (
    <Wrapper alignItems="flex-start">
      <HelpMessage size={TypographySize.H5}>
        {value === "" ? "" : props.helpText}
      </HelpMessage>
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

export default React.memo(Search);
