import React from "react";
import styled from "styled-components";
import Card from "../../v1/Card";
import Row from "../../Layout/Row";
import Column from "../../Layout/Column";
import Typography from "../../v1/Typography";
import BaseImage from "../../v1/BaseImage";
import { TypographySize, TypographyTags } from "../../StatesEnum";

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
        justifyContent="space-between"
        alignItems="center"
        width="60%"
        height="130px"
      >
        <>
          <Row justifyContent="start" alignItems="start">
            <Typography
              size={TypographySize.H3}
              as={TypographyTags.H3}
              fontWeight="100"
            >
              {title}
            </Typography>
          </Row>
          <Row justifyContent="start" alignItems="center">
            <>
              <Typography
                size={TypographySize.H6}
                as={TypographyTags.H6}
                fontWeight="700"
              >
                {startDate}
              </Typography>
              <Typography
                size={TypographySize.H6}
                as={TypographyTags.H6}
                fontWeight="700"
              >
                &nbsp;-&nbsp;
              </Typography>
              <Typography
                size={TypographySize.H6}
                as={TypographyTags.H6}
                fontWeight="700"
              >
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
      <BaseImage width="40%" height="130px">
        <img src={image} alt="boss darksouls" />
      </BaseImage>
    }
  />
);
export default React.memo(TripCard);
