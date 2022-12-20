import React from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import Checkmark from "../Animated/Checkmark";
import Row from "../Row";
import Radio from "../Animated/Radio";
import { CheckboxSizes, CheckboxType } from "../StatesEnum";
import { Omit } from "../../lib/types";

const CustomCheckboxLabel = styled.label`
  input {
    display: none;
  }
`;

const CustomCheckboxWrapper = styled(Row)`
  cursor: pointer;
`;

const BoxContainer = styled.div<{ size: CheckboxSizes }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${(props) => props.size};
  min-width: ${(props) => props.size};
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  padding: 1px;
  margin-right: 5px;
`;

type CheckboxProps = {
  id?: string;
  children: string | React.ReactNode;
  disabled?: boolean;
  type?: CheckboxType;
  checked?: boolean;
  size?: CheckboxSizes;
  animate?: boolean;
};

export type Props = Omit<
  React.HTMLProps<HTMLInputElement>,
  keyof CheckboxProps
> &
  CheckboxProps;

const Checkbox = ({
  id = uuidv4(),
  children,
  disabled,
  type = CheckboxType.CHECKBOX,
  size = CheckboxSizes.MEDIUM,
  checked,
  animate,
  onClick,
  ...props
}: Props) => (
  <CustomCheckboxLabel htmlFor={id}>
    <CustomCheckboxWrapper container alignItems="center" justifyContent="start">
      <BoxContainer size={size}>
        {type === CheckboxType.RADIO && (
          <Radio
            animateOnClick={checked}
            disabled={disabled}
            animate={animate}
          />
        )}
        {type === CheckboxType.CHECKBOX && (
          <Checkmark
            animateOnClick={checked}
            disabled={disabled}
            animate={animate}
          />
        )}
      </BoxContainer>
      {children}
      <input
        type={type}
        id={id}
        disabled={disabled}
        checked={checked}
        onClick={onClick}
        {...props}
      />
    </CustomCheckboxWrapper>
  </CustomCheckboxLabel>
);

export default React.memo(Checkbox);
