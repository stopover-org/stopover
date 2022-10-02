import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import Checkmark from "../Animated/Checkmark";
import Row from "../Row";
import Radio from "../Animated/Radio";

const Wrapper = styled.div`
  border: 1px solid black;
`;

const CustomCheckboxLabel = styled.label`
  input {
    display: none;
  }
`;

const CustomCheckboxWrapper = styled(Row)`
  cursor: pointer;
`;

type Props = {
  id?: string;
  children: React.ReactNode;
  disabled?: boolean;
  type?: string;
};

const Checkbox = ({
  id = uuidv4(),
  children,
  disabled,
  type = "checkbox",
  ...props
}: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <Wrapper>
      <CustomCheckboxLabel htmlFor={id}>
        <CustomCheckboxWrapper justifyContent="space-around">
          {type === "radio" && <Radio animateOnClick={isClicked} />}
          {type === "checkbox" && <Checkmark animateOnClick={isClicked} />}
          {children}
          <input
            type={type}
            id={id}
            disabled={disabled}
            onClick={() => setIsClicked(!isClicked)}
            {...props}
          />
        </CustomCheckboxWrapper>
      </CustomCheckboxLabel>
    </Wrapper>
  );
};

export default React.memo(Checkbox);
