import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Rating from "./Rating";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 0px 0px 0px;
`;
const InformationalBlock = styled.div`
  border: 1px solid green;
`;
const FunctionalBlock = styled.div`
  border: 1px solid red;
`;
const Name = styled.p`
  padding: 0px 0px 6px 0px;
  font-weight: 400;
  font-size: 40px;
  line-height: 48px;
`;
const Location = styled.p`
  padding: 6px 0px 0px 0px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
`;

type Props = {
  date: any; // TODO: change to moment
};

function MainInformation(props: Props) {
  return (
    <Wrapper>
      <InformationalBlock>
        <Name>Event Name, The best of all event great</Name>
        <Rating />
        <Location>Brno, Podebradova, Kralove-pole CR 614200</Location>
      </InformationalBlock>
      <FunctionalBlock>
        <Button content={props.date} />
        <Button content="" />
      </FunctionalBlock>
    </Wrapper>
  );
}

export default MainInformation;
