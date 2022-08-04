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
  const [selectedRate, setSelectedRate] = useState(0);
  const [shownRate, setShownRate] = useState<number | null>(0);

  const rateChange = (index: number) => {
    setSelectedRate(index);
    props.onClick(index);
  };

  const showRate = (index: number | null) => {
    setShownRate(index);
  };

  return (
    <Wrapper>
      <RateStyle>
        {stars.map((item, index) => (
          <RateStar
            index={index}
            selectedRate={selectedRate}
            shownRate={shownRate}
            key={index}
            onClick={rateChange}
            showRate={showRate}
          />
        ))}
      </RateStyle>
    </Wrapper>
  );
}
export default Rate;
