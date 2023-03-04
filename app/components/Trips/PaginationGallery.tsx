import React, { useState } from "react";
import styled from "styled-components";
// was forced to change TripCard => TripCardComponent. Error eslint "Using exported name 'TripCard' as identifier for default export"
import TripCardComponent from "./CompactCard";
import SkeletonTripCard from "./CompactCard/SkeletonCompactCard";
import Row from "../Layout/Row";
import Column from "../Layout/Column";
import Typography from "../v2/Typography";
import { TypographySize, TypographyTags } from "../StatesEnum";
import right from "../icons/Solid/Interface/Caret right.svg";
import left from "../icons/Solid/Interface/Caret left.svg";

const IndividualCard = styled.div`
  padding-right: 6px;
  padding-left: 6px;
`;

const ButtonArrow = styled.img`
  background-color: black;
  border-radius: 50%;
  cursor: pointer;
`;

const Wrapper = styled.div`
  ${ButtonArrow}:nth-child(1) {
    margin-right: 6px;
    margin-left: 6px;
  }
`;

type Cards = {
  title: string;
  startDate: string;
  endDate: string;
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
  ...props
}: Props) => {
  const [offset, setOffset] = useState([0, cardsShown]);
  const hasPrevious = offset[0] !== 0;
  const hasNext = offset[1] < total;
  const isShowArrow = total > cardsShown;
  const showButton = !isLoading && isShowArrow;

  return (
    <Wrapper {...props}>
      <Column>
        <Row justifyContent="start" height="80px">
          <Typography size={TypographySize.H3} as={TypographyTags.H3}>
            {title}
          </Typography>
        </Row>
        <Row justifyContent="start" alignItems="center">
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
                  startDate={item.startDate}
                  endDate={item.endDate}
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
