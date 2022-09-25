import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0px 0px 0px 0px;
  display: flex;
  flex-direction: row;
`;

const Input = styled.input`
  border: 2px solid #fdaa4c;
  background-color: transparent;
  padding: 10px;
  font-size: 16px;
  width: 150px;
  height: 35px;
  border-radius: 3px;
  color: #656565;
  margin-top: 2px;
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
  priceHandler: (startPrice: number, endPrice: number) => void;
};

const PriceInput = (props: Props) => {
  const onStartPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (+value >= props.minPrice) {
      props.priceHandler(+value, +props.endPrice);
    } else {
      props.priceHandler(+props.minPrice, +props.endPrice);
    }
  };

  const onEndPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (+value <= props.maxPrice) {
      props.priceHandler(+props.startPrice, +value);
    } else {
      props.priceHandler(+props.startPrice, +props.maxPrice);
    }
  };

  return (
    <Wrapper>
      <InputContainer>
        <Text>цена от</Text>
        <Input onChange={onStartPriceChange} value={props.startPrice || ""} />
      </InputContainer>
      <InputContainer>
        <Text>цена до</Text>
        <Input onChange={onEndPriceChange} value={props.endPrice || ""} />
      </InputContainer>
    </Wrapper>
  );
};

export default React.memo(PriceInput);
