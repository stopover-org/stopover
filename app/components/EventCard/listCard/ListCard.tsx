import React from "react";
import Card from "./card/Card";
import styled from "styled-components";

const Small = styled.div`
    display: flex;
    flex-direction: column;
`;
const Big = styled.div`
  display: flex;
  flex-direction: row;
`;

function ListCard() {
  return (
    <Big>
    <Card
      width={ 0.6 }
      description={ "This my life" }
      price={ "120kč" }
      image={ "https://i.pinimg.com/564x/eb/a1/38/eba138faec79b8bd2629e99ad2612047.jpg" }
    />
    <Small>
      <Card
        width={ 0.4 }
        height={ "50%" }
        description={ "This my life" }
        price={ "120kč" }
        image={ "https://i.pinimg.com/564x/eb/a1/38/eba138faec79b8bd2629e99ad2612047.jpg" }
      />
      <Card
        width={ 0.4 }
        height={ "50%" }
        description={ "This my life" }
        price={ "120kč" }
        image={ "https://i.pinimg.com/564x/eb/a1/38/eba138faec79b8bd2629e99ad2612047.jpg" }
      />
    </Small>
  </Big>

  );

}
export default ListCard;