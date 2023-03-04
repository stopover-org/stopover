import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Column from "../../Layout/Column";
import Row from "../../Layout/Row";
import CaretUp from "../../icons/Outline/Interface/Caret_up.svg";
import { InputVariants } from "../../StatesEnum";

const Wrapper = styled.form``;
const Content = styled(Row)`
  cursor: pointer;
`;

const SSelect = styled.select`
  width: 100%;
  border: none;
  padding: 5px;
  cursor: pointer;
`;

const SelectBorder = styled.div<{
  padding: string;
  border: string;
  borderBottom: string;
}>`
  position: relative;
  border-radius: 1px;
  padding: ${(props) => props.padding};
  width: 100%;
  border: ${(props) => props.border};
  border-bottom: ${(props) => props.borderBottom};
`;

const ArrowCover = styled.div`
  position: absolute;
  background-color: white;
  height: 100%;
  width: 25px;
  top: 0px;
  right: 0px;
`;

const SImage = styled.div<{ rotate: string }>`
  position: absolute;
  top: 20%;
  right: 0px;
  rotate: ${(props) => props.rotate};
  transition: rotate 0.5s ease-in-out;
`;
const SOption = styled.option``;

type Props = {
  content: JSX.Element;
  label?: string | React.ReactElement;
  hint?: string | React.ReactElement;
  errorMessage?: string | React.ReactElement;
  id?: string;
  items: Array<{ value: string; key: string }>;
  size?: string;
  variant?: InputVariants;
  disabled?: boolean;
  icon?: string;
};

// no animation onOpen/onClose
// original arrow is under svg image
// label does not work
const Select = ({
  content,
  label = "",
  hint = "",
  errorMessage = "",
  id = uuidv4(),
  items,
  size = "0px",
  variant = InputVariants.COMMON,
  icon,
  disabled,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const clickHandler = () => {
    setIsOpen(!isOpen);
  };
  const menuRef = useRef();
  useEffect(() => {
    const handler = (event: Event) => {
      if (!menuRef.current?.contains(event.target)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const changeHandler = (choice: React.ChangeEvent<HTMLSelectElement>) => {
    // @ts-ignore
    console.log(choice.target.value);
  };

  const borderStyle = () => {
    if (disabled) return "1px solid #797979";
    if (errorMessage) return "1px solid #BE0000";
    return "1px solid black";
  };

  return (
    <Wrapper>
      <Column>
        <Content justifyContent="start">{label}</Content>
        <SelectBorder
          padding={size}
          ref={menuRef}
          border={variant === InputVariants.COMMON ? borderStyle() : ""}
          borderBottom={variant === InputVariants.OUTLINED ? borderStyle() : ""}
        >
          <SSelect
            onClick={clickHandler}
            disabled={disabled}
            defaultValue="default value"
            id={id}
            onChange={(choice) => {
              changeHandler(choice);
            }}
            {...props}
          >
            <SOption value="default value" disabled>
              Select...
            </SOption>
            {items.map((item, index) => (
              <SOption key={index} value={item.value}>
                {item.key}
              </SOption>
            ))}
          </SSelect>
          <ArrowCover />
          <SImage rotate={isOpen ? "0deg" : "180deg"}>
            <Image src={CaretUp} width="25px" height="25px" alt="caret" />
          </SImage>
        </SelectBorder>
        <Content justifyContent="start">{errorMessage || hint}</Content>
      </Column>
    </Wrapper>
  );
};

export default Select;
