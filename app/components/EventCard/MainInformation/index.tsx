import React from "react";
import styled from "styled-components";
import { Moment } from "moment";
import Button from "./Button";
import AverageRating from "./AverageRating";
import Tags from "./Tags";
import shoppingCart from "../../icons/Solid/General/Shopping-cart.svg";

const Wrapper = styled.div`
  min-width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 15px 0px 0px 0px;
  border: 1px solid black;
`;
const InformationalBlock = styled.div`
  .average-rating-wrapper {
    display: inline-block;
  }
  .tags-wrapper {
    display: inline-block;
    padding-left: 6px;
  }
`;
const FunctionalBlock = styled.div`
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
  date: Moment;
};

function MainInformation(props: Props) {
  return (
    <Wrapper>
      <InformationalBlock>
        <Name>Event Name, The best of all event great</Name>
        <AverageRating averageRating={2.5} />
        <Tags
          content={[
            {
              tagName: "dont show this",
              image: shoppingCart.src,
            },
            {
              tagName: "show this",
              image: shoppingCart.src,
            },
            {
              tagName: "dont show this",
              image: shoppingCart.src,
            },
            {
              tagName: "show this",
              image: "",
            },
            {
              tagName: "dont show this",
              image: shoppingCart.src,
            },
            {
              tagName: "dont show this",
              image: shoppingCart.src,
            },
          ]}
        />
        <Location>Brno, Podebradova, Kralove-pole CR 614200</Location>
      </InformationalBlock>
      <FunctionalBlock>
        <Button inscription={props.date} />
        <Button
          inscription="6555500kc"
          contentAfterInscription={[
            <img src={shoppingCart.src} alt="icon" />,
            "+",
          ]}
        />
      </FunctionalBlock>
    </Wrapper>
  );
}

export default MainInformation;
