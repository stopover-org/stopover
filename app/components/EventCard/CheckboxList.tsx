import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.form`
  max-height: 300px;
  overflow-y: scroll;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CustomCheckbox = styled.label`
  display: flex;
  flex-direction: row;
  padding: 6px 0px 6px 0px;
`;
const CustomCheckboxCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #c2e0fe;
  min-width: 35px;
  height: 35px;
  input {
    display: none;
  }
`;
const CustomCheckboxIndicator = styled.label<{ display: string }>`
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
  builtIn?: boolean;
  id: string;
};

type Props = {
  list: List[];
};
const CheckboxList = ({ list }: Props) => {
  const [listCheckbox, setListCheckbox] = useState(
    list.map((item) => ({
      id: item.id,
      description: item.description,
      checked: false,
      price: item.price,
      builtIn: item.builtIn,
    }))
  );
  const onClickCheck = (id: string) => {
    const indexCorrespondentId = listCheckbox.findIndex(
      (item) => item.id === id
    );
    // traking what checkbox was clicked and changing coresponded porperty
    setListCheckbox([
      ...listCheckbox.slice(
        0,
        listCheckbox.findIndex((item) => item.id === id)
      ),
      {
        ...listCheckbox[indexCorrespondentId],
        checked: !listCheckbox[indexCorrespondentId].checked,
      },
      ...listCheckbox.slice(indexCorrespondentId + 1, listCheckbox.length),
    ]);
  };
  return (
    <Wrapper>
      {listCheckbox.map((item, index) => (
        <Row key={index}>
          {/* Each checkbox have to has its own id. Needed for traking what is checked */}
          <CustomCheckbox htmlFor={item.id}>
            <CustomCheckboxCircle>
              {/* Checkbox we see. Only visual */}
              <CustomCheckboxIndicator
                display={item.checked ? "block" : "none"}
              >
                {/* Invisible checkbox. Doing calculations */}
                <input
                  type="radio"
                  id={item.id}
                  onClick={() => onClickCheck(item.id)}
                />
              </CustomCheckboxIndicator>
            </CustomCheckboxCircle>
            <Description>{item.description}</Description>
          </CustomCheckbox>
          <Price textDecoration={item.builtIn ? "line-through" : "auto"}>
            {item?.price}
          </Price>
        </Row>
      ))}
    </Wrapper>
  );
};
export default CheckboxList;
