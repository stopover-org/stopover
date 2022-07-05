import React from "react";
import styled from "styled-components";
import icon from "../../components/icons/Outline/Interface/Edit.svg";
import Image from "next/image";

const ImageWrapper = styled.div`
  display: none;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid transparent;
  font-family: 'Inter';
  font-size: 36px;
  font-weight: 400;
  line-height: 44px;
  width: 100%;
  &:focus {
      outline: none;
      border-bottom: 1px solid black;
  }
`;

const Wrapper = styled.div`
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  &:hover ${ImageWrapper} {
    display: block;
    border-bottom: 1px solid black;
  }
  &:hover ${Input} {
    border-bottom: 1px solid black;
  }
`;

function LocationInput() {

  return (
    <Wrapper>
        <Input 
            type="text"
            placeholder="search location"
        />
        <ImageWrapper>
            <Image
              src={icon.src}
              alt="Picture of the author"
              width={46}
              height={46}
            />
        </ImageWrapper>
    </Wrapper>
  );
}

export default LocationInput;