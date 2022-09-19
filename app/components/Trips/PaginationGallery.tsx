import React, { useState } from "react";
import styled from "styled-components";
// was forced to change TripCard => TripCardComponent. Error eslint "Using exported name 'TripCard' as identifier for default export"
import TripCardComponent from "./TripCard";
import SkeletonTripCard from "./TripCard/SkeletonTripCard";
import Row from "../Row";
import Column from "../Column";
import Typography from "../Typography";
import { TypographySize, TypographyTags } from "../Typography/StatesEnum";
import right from "../icons/Solid/Interface/Caret right.svg";
import left from "../icons/Solid/Interface/Caret left.svg";

const Wrapper = styled.div``;

const IndividualCard = styled.div`
  padding-right: 12px;
`;

const ButtonArrow = styled.img`
  background-color: black;
  border-radius: 50%;
  cursor: pointer;
`;

type Cards = {
  title: string;
  date: string;
  places: string;
  location: string;
  image: string;
};

type Props = {
  isLoading: boolean;
  cards: Cards[];
  title: string;
  cardsShown: number;
  total: number;
  onClickShift: (offset: number[]) => void;
};

const PaginationGallery = ({
  isLoading,
  cards,
  title,
  cardsShown,
  total,
  onClickShift,
}: Props) => {
  const [offset, setOffset] = useState([0, cardsShown]);

  const hasPrevious = offset[0] !== 0;

  const hasNext = offset[1] < total;

  const isShowArrow = total > cardsShown;

  const showButton = !isLoading && isShowArrow;

  return (
    <Wrapper>
      <Column>
        <Row justifyContent="start">
          <Typography size={TypographySize.H3} as={TypographyTags.H3} bold>
            {title}
          </Typography>
        </Row>
        <Row justifyContent="start">
          {isLoading &&
            new Array(cardsShown).fill("").map((_, index) => (
              <IndividualCard key={index}>
                <SkeletonTripCard />
              </IndividualCard>
            ))}
          {showButton && hasPrevious && (
            <ButtonArrow
              width={32}
              height={32}
              alt="arrow"
              src={left.src}
              onClick={() => {
                onClickShift(offset);
                setOffset([offset[0] - cardsShown, offset[1] - cardsShown]);
              }}
            />
          )}
          {!isLoading &&
            cards.map((item, index) => (
              <IndividualCard key={index}>
                <TripCardComponent
                  title={item.title}
                  date={item.date}
                  places={item.places}
                  location={item.location}
                  image={item.image}
                />
              </IndividualCard>
            ))}
          {showButton && hasNext && (
            <ButtonArrow
              width={32}
              height={32}
              alt="arrow"
              src={right.src}
              onClick={() => {
                onClickShift(offset);
                setOffset([offset[0] + cardsShown, offset[1] + cardsShown]);
              }}
            />
          )}
        </Row>
      </Column>
    </Wrapper>
  );
};

export default PaginationGallery;
