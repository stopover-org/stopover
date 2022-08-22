import React from "react";
import styled from "styled-components";
import { Moment } from "moment";
import Image from "next/image";
import Button from "./Button";
import Rating from "./Rating";
import icon from "../../icons/Solid/General/Shopping-cart.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  padding: 15px 0px 0px 0px;
`;
const InformationalBlock = styled.div`
  border: 1px solid green;
`;
const FunctionalBlock = styled.div`
  //TODO: с помощью children сдлетаь отступ в 10px
  display: flex;
  flex-direction: row;
  #fncBlock {
    padding-left: 10px;
  }
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
  date: Moment; // TODO: change to moment
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
        <Button inscription={props.date} />
        <Button
          inscription="6555500kc"
          contentAfterInscription={[<Image src={icon.src} alt="icon" />, "+"]}
        />
      </FunctionalBlock>
    </Wrapper>
  );
}

export default MainInformation;
