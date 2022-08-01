import React, { useState } from "react";
import styled from "styled-components";
import RateStar from "./RateStar";

const RateStyle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
`;

function Rate() {
  const stars = new Array(5).fill("");
  const [rate, setRate] = useState(0);

  const clickHandler = (index: number) => {
    setRate(index);
  };

  return (
    <RateStyle>
      {stars.map((item, index) => (
        <RateStar
          index={index}
          rate={rate}
          key={index}
          clickHandler={clickHandler}
        />
      ))}
    </RateStyle>
  );
}
export default Rate;
