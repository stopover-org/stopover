import React from "react";
import styled from "styled-components";
import icon from "../../components/icons/Outline/Interface/Edit-alt.svg";
import Image from "next/image";

const ImageWrapper = styled.div`
  display: none;
  position: relative;
  bottom: -7px;
  left: 16px;
`;

const SImage = styled(Image)`
`;

const Input = styled.input`
  border: none;
  border-bottom: 2px solid transparent;
  font-family: 'Inter';
  font-size: 36px;
  font-weight: 400;
  line-height: 44px;
  width: 372px;
  

  &:focus {
      outline: none;
      border-bottom: 2px solid #D9D9D9;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  padding: 40px 0px 15px 30px;
  &:hover ${ImageWrapper} {
    display: block;
  }
  &:hover ${Input} {
    border-bottom: 2px solid #D9D9D9;
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
            <SImage
              src={icon.src}
              alt="Picture of the author"
              width={25}
              height={25}
            />
        </ImageWrapper>
    </Wrapper>
  );
}

export default LocationInput;