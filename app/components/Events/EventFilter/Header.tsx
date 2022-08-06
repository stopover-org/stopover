import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Logo = styled.div`
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 75px;
  background-color: grey;
  color: white;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  p {
    padding-left: 30px;
    padding-right: 38px;
    cursor: pointer;
  }
`;

function Header() {
  return (
    <Wrapper>
      <Logo>250 x 75</Logo>
      <NavBar>
        <p>Путешествие</p>
        <p>Вход</p>
      </NavBar>
    </Wrapper>
  );
}

export default Header;
