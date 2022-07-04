import React from "react";
import styled from "styled-components";
import icon from "../../components/icons/Outline/Interface/Edit.svg";
import Image from "next/image";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Input = styled.input`
    border: none;
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

function LocationInput() {

  return (
    <Wrapper>
        <Input 
            type="text"
            placeholder="search location"
        />
        <Image
          src={icon.src}
          alt="Picture of the author"
          width={22}
          height={22}
        />        
    </Wrapper>
  );
}

export default LocationInput;