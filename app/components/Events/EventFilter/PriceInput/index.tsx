import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0px 0px 0px 0px;
  display: flex;
  flex-direction: row;
`;

const Input = styled.input`
  border: 2px solid #fdaa4c;
  background-color: transparent;
  font-size: 36px;
  font-weight: 400;
  line-height: 44px;
  width: 150px;
  height: 35px;
  border-radius: 3px;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: #656565;
  &:focus {
    outline: none;
  }
`;

const Text = styled.p`
  font-size: 14px;
`;

const InputContainer = styled.label`
  padding: 0px 30px 0px 0px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

type Props = {
  startPrice: number;
  endPrice: number;
  maxPrice: number;
  minPrice: number;
  priceHandler: (startPrice: number | null, endPrice: number | null) => void;
};
const isValidNumber = (value: any) => !+value.isNaN();
const isValid = (value: any) =>
  !(value === undefined || +value === undefined || value === null);

function PriceInput(props: Props) {
  const [startPrice, setStartPrice] = useState<string>(
    props.minPrice.toString()
  );
  const [endPrice, setEndPrice] = useState<string>(props.maxPrice.toString());

  const onStartPriceChange = (value: string) => {
    if (isValidNumber(+value) && isValid(value)) {
      if (+value >= 0 && +value <= props.maxPrice) {
        setStartPrice(value);
      }
    }
  };

  const onEndPriceChange = (value: string) => {
    if (isValidNumber(+value) && isValid(value)) {
      if (+value >= 0 && +value <= props.maxPrice) {
        setEndPrice(value);
      }
    }
  };

  useEffect(() => {
    props.priceHandler(+startPrice, +endPrice);
  }, [startPrice, endPrice]);

  useEffect(() => {
    setStartPrice(props.startPrice.toString());
    setEndPrice(props.endPrice.toString());
  }, [props.startPrice, props.endPrice]);

  return (
    <Wrapper>
      <InputContainer>
        <Text>цена от</Text>
        <Input
          onChange={(e) => {
            onStartPriceChange(e.target.value);
          }}
          value={startPrice}
        />
      </InputContainer>
      <InputContainer>
        <Text>цена до</Text>
        <Input
          onChange={(e) => {
            onEndPriceChange(e.target.value);
          }}
          value={endPrice}
        />
      </InputContainer>
    </Wrapper>
  );
}

export default PriceInput;
