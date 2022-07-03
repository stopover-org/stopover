import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import ListCard from "./listCard/ListCard";
import Card from "./listCard/card/Card";

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

const Temp = styled.div<{ width: number }>`
    border: 1px solid black;
    width: ${props => props.width*2}px;
    @media (max-width: 500px){
      width: 100px;
    }

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

//
/*        


*/