import React from "react";
import styled from "styled-components";
import Card from "../Card";
import BaseImage from "../BaseImage";
import Typography from "../Typography";
import Row from "../Row";
import Column from "../Column";
import {
  CardImageLocation,
  TypographySize,
  TypographyTags,
} from "../StatesEnum";

const SColumn = styled(Column)`
  padding: 18px 30px 18px 30px;
`;
const SRow = styled(Row)``;
const SText = styled(Typography)`
  overflow: hidden;
  padding-top: 11px;
  padding-bottom: 11px;
`;

type Props = {
  image: string;
  title: string;
  text: string;
  units: string;
  time: string;
};

export const BookingCard = ({ image, title, text, units, time }: Props) => (
  <Card
    imageLocation={CardImageLocation.RIGHT}
    width="946px"
    height="320px"
    content={
      <SColumn width="67%">
        <SRow justifyContent="space-between" container height="auto">
          <Typography size="22px" as={TypographyTags.LARGE}>
            {title}
          </Typography>
          <Typography size={TypographySize.LARGE} as={TypographyTags.LARGE}>
            {time}
          </Typography>
        </SRow>
        <SRow container height="100%">
          <SText size={TypographySize.BIG} as={TypographyTags.BIG}>
            {text}
          </SText>
        </SRow>
        <SRow>
          <Typography size="22px" as={TypographyTags.LARGE}>
            Количество участников: {units}
          </Typography>
        </SRow>
      </SColumn>
    }
    image={
      <BaseImage width="33%">
        <img src={image} alt="card" />
      </BaseImage>
    }
  />
);
export default React.memo(BookingCard);
