import React, { useState } from "react";
import styled from "styled-components";
import RateStar from "./RateStar";

const Wrapper = styled.div`
  display: block;
  width: 120px;
  height: 25px;
`;

const RateStyle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
`;

type Props = {
  onClick: (rateIndex: number) => void;
};

function Rate(props: Props) {
  const stars = new Array(5).fill("");
  const [rate, setRate] = useState(0);

  const rateChange = (index: number) => {
    setRate(index);
    props.onClick(index);
  };

  return (
    <Wrapper>
      <RateStyle>
        {stars.map((item, index) => (
          <RateStar
            index={index}
            rate={rate}
            key={index}
            onClick={rateChange}
          />
        ))}
      </RateStyle>
    </Wrapper>
  );
}
export default Rate;
