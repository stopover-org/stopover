import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-top: 6px;
  padding-bottom: 6px;
`;

const Content = styled.div``;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Column = styled.p<{ textDecoration: string }>`
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  padding-top: 6px;
  padding-bottom: 6px;
  text-decoration: ${(props) => props.textDecoration};
`;

type EventOptions = {
  column1: string;
  column2: string;
  builtIn?: boolean;
};

type Props = {
  eventOptions: EventOptions[];
};

const ReadOnly = ({ eventOptions }: Props) => (
  <Wrapper>
    <Content>
      {eventOptions.map((item) => (
        <Row>
          <Column textDecoration="auto">{item.column1}</Column>
          <Column textDecoration={item.builtIn ? "line-through" : "auto"}>
            {item.column2}
          </Column>
        </Row>
      ))}
    </Content>
  </Wrapper>
);

export default ReadOnly;
