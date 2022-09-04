import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  max-height: 300px;
  overflow-y: scroll;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CustomRadioButton = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px 0px 6px 0px;
`;
const CustomRadioButtonCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: white;
  width: 35px;
  height: 35px;
`;
const CustomRadioButtonIndicator = styled.div<{ display: string }>`
  display: ${(props) => props.display};
  border-radius: 50%;
  background-color: #c2e0fe;
  width: 24px;
  height: 24px;
`;
const Description = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  padding-left: 12px;
`;
const Price = styled.p<{ textDecoration: string }>`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  text-decoration: ${(props) => props.textDecoration};
`;

type List = {
  description: string;
  price?: string | number;
  free?: boolean;
};

type Props = {
  list: List[];
};
const RadioButtonList = ({ list }: Props) => {
  const [listRadioButton, setListRadioButton] = useState(
    list.map((item, index) => ({
      id: index,
      description: item.description,
      checked: false,
      price: item.price,
      free: item.free,
    }))
  );
  const onClickCheck = (id: number) => {
    setListRadioButton([
      ...listRadioButton.slice(
        0,
        listRadioButton.findIndex((item) => item.id === id)
      ),
      {
        id,
        description:
          listRadioButton[listRadioButton.findIndex((item) => item.id === id)]
            .description,
        checked:
          !listRadioButton[listRadioButton.findIndex((item) => item.id === id)]
            .checked,
        price:
          listRadioButton[listRadioButton.findIndex((item) => item.id === id)]
            .price,
        free: listRadioButton[
          listRadioButton.findIndex((item) => item.id === id)
        ].free,
      },
      ...listRadioButton.slice(
        listRadioButton.findIndex((item) => item.id === id) + 1,
        listRadioButton.length
      ),
    ]);
  };

  return (
    <Wrapper>
      {listRadioButton.map((item, index) => (
        <Row>
          <CustomRadioButton onClick={() => onClickCheck(item.id)} key={index}>
            <CustomRadioButtonCircle>
              <CustomRadioButtonIndicator
                display={item.checked ? "block" : "none"}
              />
            </CustomRadioButtonCircle>
            <Description>{item.description}</Description>
          </CustomRadioButton>
          <Price textDecoration={item.free ? "auto" : "line-through"}>
            {item?.price}
          </Price>
        </Row>
      ))}
    </Wrapper>
  );
};
export default RadioButtonList;
