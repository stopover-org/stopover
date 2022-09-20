import React from "react";
import styled from "styled-components";
import Card from "../../Card";
import Row from "../../Row";
import Column from "../../Column";
import Typography from "../../Typography";
import BaseImage from "../../BaseImage";
import { TypographySize, TypographyTags } from "../../Typography/StatesEnum";

const Content = styled(Column)`
  padding: 10px;
`;

type Props = {
  title: string;
  startDate: string;
  endDate: string;
  places: string;
  location: string;
  image: string;
};

export const TripCard = ({
  title,
  startDate,
  endDate,
  places,
  location,
  image,
}: Props) => (
  <Card
    width="400px"
    content={
      <Content
        justifyContent="center"
        alignItems="center"
        width="60%"
        height="130px"
      >
        <>
          <Row justifyContent="start" alignItems="start">
            <Typography size={TypographySize.H3} as={TypographyTags.H3}>
              {title}
            </Typography>
          </Row>
          <Row justifyContent="start" alignItems="center">
            <>
              <Typography size={TypographySize.H6} as={TypographyTags.H6} bold>
                {startDate}
              </Typography>
              <Typography size={TypographySize.H6} as={TypographyTags.H6} bold>
                {endDate}
              </Typography>
            </>
          </Row>
          <Row justifyContent="space-between" alignItems="end">
            <>
              <Typography size={TypographySize.H6} as={TypographyTags.H6}>
                {places}
              </Typography>
              <Typography size={TypographySize.H6} as={TypographyTags.H6}>
                {location}
              </Typography>
            </>
          </Row>
        </>
      </Content>
    }
    image={
      <BaseImage width="40%">
        <img src={image} alt="boss darksouls" width="100%" height="100%" />
      </BaseImage>
    }
  />
);
export default React.memo(TripCard);
