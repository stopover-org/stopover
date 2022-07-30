import React from "react";
import styled from "styled-components";
import ListCard from "./ListCard/ListCard";

const ContainerBody = styled.div`
  border: 1px solid black;
  max-width: 1440px;
  min-width: 100px;
  width: 1440px;
  height: 100%;
  background-color: #acacac;
`;

function Layout() {
  return (
    <ContainerBody>
      <ListCard />
    </ContainerBody>
  );
}
export default Layout;
