import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.form``;
const RadioButton = styled.label`
  display: flex;
  flex-direction: row;
  padding: 6px 0px 6px 0px;
`;

const CustomRadioButtonCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #c2e0fe;
  min-width: 35px;
  width: 35px;
  height: 35px;
  input {
    display: none;
  }
`;

const CustomRadioButtonIndicator = styled.label<{ display: string }>`
  display: ${(props) => props.display};
  border-radius: 50%;
  background-color: white;
  width: 24px;
  height: 24px;
  //box-shadow: 1px 1px 5px 1px #98a6b5;
`;

const Description = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  padding-left: 12px;
`;

type Props = {
  list: string[];
};

const RadioButtonList = ({ list }: Props) => {
  const [selectedRadioButton, setSelectedRadioButton] = useState("");
  const isRadioSelected = (value: string): boolean =>
    selectedRadioButton === value;

  const handleRadioClick = (e: ChangeEvent<HTMLInputElement>) =>
    setSelectedRadioButton(e.currentTarget.value);

  return (
    <Wrapper>
      {list.map((item, index) => (
        <RadioButton key={index} htmlFor={item.concat(index.toString())}>
          <CustomRadioButtonCircle>
            <CustomRadioButtonIndicator
              display={
                isRadioSelected(item.concat(index.toString()))
                  ? "block"
                  : "none"
              }
            />
            {/* id generates from description and index */}
            <input
              type="radio"
              value={item.concat(index.toString())}
              checked={isRadioSelected(item.concat(index.toString()))}
              id={item.concat(index.toString())}
              onChange={handleRadioClick}
            />
          </CustomRadioButtonCircle>
          <Description>{item}</Description>
        </RadioButton>
      ))}
    </Wrapper>
  );
};

export default RadioButtonList;
