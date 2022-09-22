import React, { useState } from "react";
import styled from "styled-components";
import RateStar from "./RateStar";

const Wrapper = styled.div`
  padding: 34px 30px 34px 0px;
  cursor: pointer;
  display: block;
`;

const RateStyle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
`;
const Container = styled.label``;
const Text = styled.p`
  font-size: 24px;
`;

type Props = {
  onClick: (rateIndex: number) => void;
};

const Rate = (props: Props) => {
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
      <Container>
        <Text>Рейтинг</Text>
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
      </Container>
    </Wrapper>
  );
};

export default Rate;
