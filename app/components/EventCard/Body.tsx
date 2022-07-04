import React from "react";
import styled from "styled-components";
import ListCard from "./listCard/ListCard";

const BodyStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ContainerBody = styled.div`
  border: 1px solid black;
  max-width: 1440px;
  min-width: 100px;
  width: 1440px;
  height: 100%;
  background-color: #acacac;
`;

function Body() {
  return (
    <BodyStyle>
      <ContainerBody>
        <ListCard />
      </ContainerBody>
    </BodyStyle>
  );
}
export default Body;