import React from "react";
import styled from "styled-components";
import Typography from "../v1/Typography";
import Row from "../Layout/Row";
import { TypographySize, TypographyTags } from "../StatesEnum";

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

const NavBar = styled(Row)`
  a {
    padding-right: 38px;
  }
`;

const Header = () => (
  <Wrapper>
    <Logo>250 x 75</Logo>
    <NavBar justifyContent="flex-end">
      <Typography size={TypographySize.BIG} as={TypographyTags.LINK}>
        Путешествие
      </Typography>
      <Typography size={TypographySize.BIG} as={TypographyTags.LINK}>
        Вход
      </Typography>
    </NavBar>
  </Wrapper>
);

export default Header;
