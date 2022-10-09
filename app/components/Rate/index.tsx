import React, { useState } from "react";
import styled from "styled-components";
import RateStar from "./RateStar";

const Wrapper = styled.div`
  width: 100%;
  min-height: 24px;
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const RateStyle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
`;
type Props = {
  onClick: (rateIndex: number) => void;
};

const Rate = ({ onClick }: Props) => {
  const stars = new Array(5).fill("");
  const [selectedRate, setSelectedRate] = useState(0);
  const [shownRate, setShownRate] = useState<number | null>(2);
  const rateChange = (index: number) => {
    setSelectedRate(index);

    onClick(index);
  };

  const showRate = (index: number | null) => {
    setShownRate(index);
  };

  return (
    <Wrapper>
      <RateStyle>
        {stars.map((_, index) => (
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
};

export default Rate;
