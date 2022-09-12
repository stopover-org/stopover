import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 0px 0px 0px;
  input {
    width: 20px;
    height: 20px;
  }
`;

const Container = styled.label`
  display: flex;
  flex-direction: row;
`;

const Text = styled.div`
  font-size: 24px;
`;

type Props = {
  onClick: (event: React.SyntheticEvent<HTMLInputElement>) => void;
};

const IndividualEvents = (props: Props) => (
  <Wrapper>
    <Container>
      <input
        type="checkbox"
        onClick={(e: React.SyntheticEvent<HTMLInputElement>) =>
          props.onClick(e)
        }
      />
      <Text>Индивидуальное мероприятие</Text>
    </Container>
  </Wrapper>
);

export default IndividualEvents;
