import React from "react";
import styled from "styled-components";

const RefStyle = styled.a`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: background-color linear 0.5s, color linear 0.2s;
  &:hover{
    background-color: black;
    color: white;
  }
`;

const NavBarStyle = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
`;

function Header() {
  const refCount = ["home", "my adventure", "my account"];

  return (
    <NavBarStyle>
      { refCount.map((item, index) => {
        return (
          <RefStyle 
            href="#"
            key={ index }  
          >
            { item }
          </RefStyle>
        );
      }) }
    </NavBarStyle>
  );

}
export default Header;