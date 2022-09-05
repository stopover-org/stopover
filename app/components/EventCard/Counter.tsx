import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import CaretUp from "../icons/Outline/Interface/Caret up.svg";
import CaretDown from "../icons/Outline/Interface/Caret down.svg";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #c2e0fe;
  padding: 12px;
`;
const Amount = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
`;
const AmountNumber = styled.input`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  width: 45px;
  border: none;
  outline: none;
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonUp = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

const ButtonDown = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
`;
const Description = styled.p`
  width: 100%;
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
`;

type Props = {
  description: string;
};
const Counter = ({ description }: Props) => {
  const maxItems = 5;
  const [amount, setAmount] = useState<number>(0);
  const OnChangechangeAmount = (e: HTMLInputElement) => {
    if (+e.value <= maxItems && +e.value >= 0) {
      setAmount(+e.value);
    }
  };
  const OnClickchangeAmount = (delta: number) => {
    if (amount + delta <= maxItems && amount + delta >= 0) {
      setAmount(amount + delta);
    }
  };
  return (
    <Wrapper>
      <Amount>
        <AmountNumber
          type="text"
          onChange={(e) => OnChangechangeAmount(e.target)}
          value={amount}
        />
        <Buttons>
          <ButtonUp onClick={() => OnClickchangeAmount(+1)}>
            <Image height={20} width={20} src={CaretUp.src} alt="arrow up" />
          </ButtonUp>
          <ButtonDown onClick={() => OnClickchangeAmount(-1)}>
            <Image
              height={20}
              width={20}
              src={CaretDown.src}
              alt="arrow down"
            />
          </ButtonDown>
        </Buttons>
        <Description>{description}</Description>
      </Amount>
    </Wrapper>
  );
};
export default Counter;
