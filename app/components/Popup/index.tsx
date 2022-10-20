import React from "react";
import styled from "styled-components";
import Row from "../Row";
import { PopupSizes } from "../StatesEnum";

const Wrapper = styled(Row)<{ padding: string }>`
  border-radius: 10px;
  position: relative;
  background-color: #ededed;
  padding: ${(props) => props.padding};
  cursor: pointer;
`;

const PopupWindow = styled(Row)<{ opacity: number }>`
  top: 90%;

  box-shadow: 0px 0px 3px 3px grey;
  background: white;
  position: absolute;
  opacity: ${(props) => props.opacity};
`;
const STitle = styled.div``;

type Props = {
  children: React.ReactElement;
  component: React.ReactElement;
  isOpen: boolean;
  size?: PopupSizes;
  onOpen: () => void;
  onClose: () => void;
};
const Popup = ({
  children,
  component,
  isOpen,
  onOpen,
  onClose,
  size = PopupSizes.SMALL,
}: Props) => (
  <Wrapper
    width="auto"
    padding={size}
    onClick={() => {
      if (!isOpen) onOpen();
      if (isOpen) onClose();
    }}
  >
    <STitle>{children}</STitle>
    <PopupWindow opacity={isOpen ? 1 : 0}>{component}</PopupWindow>
  </Wrapper>
);

export default React.memo(Popup);
