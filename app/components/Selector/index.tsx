import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Column from "../Column";
import Row from "../Row";

const Wrapper = styled.form`
  border: 1px solid red;
`;

const Content = styled(Row)`
  cursor: pointer;
`;

const SSelect = styled.select`
  border: 3px solid green;
  width: 100%;
  border: none;
  padding: 5px;
  cursor: pointer;
  :focus {
    border: none;
  }
`;
const SOption = styled.option``;

type Props = {
  content: JSX.Element;
  label?: string | React.ReactElement;
  hint?: string | React.ReactElement;
  errorMessage?: string | React.ReactElement;
  id?: string;
  items: ;
};

//no animation onOpen/onClose
//original arrow is under svg image
//label does not work
const Selector = ({
  content,
  label = "",
  hint = "",
  errorMessage = "",
  id = uuidv4(),
}: Props) => {
  const changeHandler = (choice) => {
    console.log(choice.target.value);
  };
  return (
    <Wrapper>
      <label htmlFor={id}>
        <Column>
          <Content justifyContent="start">{label}</Content>
          <SSelect
            onChange={(choice) => changeHandler(choice)}
            defaultValue="default value"
            id={id}
          >
            <optgroup label="Maybe">
              <SOption value="default value" disabled>
                Select...
              </SOption>
              <SOption value="option1">{content}</SOption>
              <SOption value="option2">option 2</SOption>
              <SOption value="option3">option 3</SOption>
            </optgroup>
          </SSelect>
          <Content justifyContent="start">{errorMessage || hint}</Content>
        </Column>
      </label>
    </Wrapper>
  );
};

export default Selector;
