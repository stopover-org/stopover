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
  padding: 15px 0px 6px 0px;
`;
const InformationalBlock = styled.div`
  .average-rating-wrapper {
    display: inline-block;
  }
  .tags-wrapper {
    display: inline-block;
    padding-left: 6px;
  }
  .tag-wrapper {
    padding: 6px;
  }
`;
const FunctionalBlock = styled.div`
  display: flex;
  flex-direction: row;
  .button-wrapper {
    padding-left: 12px;
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

type Tag = {
  tagName: string;
  image?: string;
};

type Props = {
  date: Moment;
  content: Tag[];
  price: number | string;
  currency: string;
  averageRating: number;
};

const MainInformation = ({
  date,
  content,
  price,
  currency,
  averageRating,
}: Props) => (
  <Wrapper>
    <InformationalBlock>
      <Name>Event Name, The best of all event great</Name>
      <AverageRating averageRating={averageRating} />
      <Tags content={content} />
      <Location>Brno, Podebradova, Kralove-pole CR 614200</Location>
    </InformationalBlock>
    <FunctionalBlock>
      <Button inscription={date} />
      <Button
        inscription={price} // TODO if space => goes nuts
        contentAfterInscription={[
          currency,
          <img src={shoppingCart.src} alt="icon" />,
          "+",
        ]}
      />
    </FunctionalBlock>
  </Wrapper>
);

export default MainInformation;
