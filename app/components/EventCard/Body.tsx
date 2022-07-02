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
  max-width: 1000px;
  min-width: 100px;
  width: 1000px;
  height: 100%;
  background-color: #acacac;

`;

function Body() {
  let ref = useRef();
  const [state, setState] = useState();


  useEffect(() => {

    setState(ref.current.offsetWidth);

  },[])

  


  return (
    <BodyStyle>

        <ContainerBody ref={ ref }>
          <Card
            width={ 0.6 }
            layoutWidth={ state }
            description={ "This my life" }
            price={ "120kč" }
            image={ "https://i.pinimg.com/564x/eb/a1/38/eba138faec79b8bd2629e99ad2612047.jpg" }
          />
        </ContainerBody>
      
        
    </BodyStyle>
  );

}
export default Body;

//<ListCard />