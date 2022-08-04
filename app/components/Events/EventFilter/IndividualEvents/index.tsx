import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 10px 0px;
  input {
    width: 20px;
    height: 20px;
  }
`;

type Props = {
  onClick: (checkedBox: MouseEvent) => void;
};

function IndividualEvents(props: Props) {
  return (
    <Wrapper>
      <input type="checkbox" onClick={(e: MouseEvent) => props.onClick(e)} />
    </Wrapper>
  );
}

export default IndividualEvents;
