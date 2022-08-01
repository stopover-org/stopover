import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import icon from "../../icons/Outline/Interface/Edit-alt.svg";

const ImageWrapper = styled.div`
  display: none;
  position: relative;
  bottom: -16px;
  left: 16px;
`;

const SImage = styled(Image)``;

const Input = styled.input`
  border: none;
  border-bottom: 2px solid transparent;
  font-size: 36px;
  font-weight: 400;
  line-height: 44px;
  width: 372px;

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
  width: 100%;
  &:hover ${ImageWrapper} {
    display: inline-block;
  }
  &:hover ${Input} {
    border-bottom: 2px solid #d9d9d9;
  }
`;

function LocationInput() {
  const [value, setValue] = useState("");
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <Wrapper>
      <HelpMessage>{value === "" ? "" : "Вы выбрали"}</HelpMessage>
      <div>
        <Input
          type="text"
          placeholder="search location"
          value={value}
          onChange={(e) => onChange(e)}
        />
        <ImageWrapper>
          <SImage
            src={icon.src}
            alt="Picture of the author"
            width={25}
            height={25}
          />
        </ImageWrapper>
      </div>
    </Wrapper>
  );
}

export default LocationInput;
