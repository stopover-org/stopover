import React from "react";
import styled from "styled-components";
import icon from "../../../icons/Outline/Interface/Search.svg";

const Wrapper = styled.div`
  position: relative;

  input {
    width: 650px;
    border: none;
    border-bottom: 2px solid #d9d9d9;
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 44px;
    opacity: 0.3;
    &:focus {
      outline: none;
      border-bottom: 2px solid #d9d9d9;
    }
  }
`;

const Icon = styled.img`
  top: 10%;
  left: 614px;
  position: absolute;
  width: 36px;
  height: 36px;
  opacity: 0.5;
`;

function Search() {
  return (
    <Wrapper>
      <input placeholder="Какое мероприятие вы ищете?" />
      <Icon src={icon.src} />
    </Wrapper>
  );
}

export default Search;
