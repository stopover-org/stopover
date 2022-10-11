import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Card from "../Card";
import AverageRating from "../EventCard/AverageRating";
import {
  CardImageLocation,
  TypographySize,
  TypographyTags,
  TagSizes,
  ButtonSizes,
  ButtonIconPlace,
} from "../StatesEnum";
import Typography from "../Typography";
import BaseImage from "../BaseImage";
import Column from "../Column";
import Link from "../Link";
import Tag from "../Tag";
import Row from "../Row";
import Button from "../Button";
import icon from "../icons/Outline/General/Shopping_cart_white.svg";

const TagList = styled(Column)`
  padding: 10px;
`;

const SColumn = styled(Column)`
  padding: 10px;
  height: 40%;
`;

const SRow = styled(Row)`
  padding-top: 5px;
  padding-bottom: 5px;
`;

const RatingWrapper = styled(Row)`
  padding-bottom: 20px;
`;

const SLink = styled.div`
  padding-right: 10px;
`;

const STag = styled.div`
  padding-bottom: 10px;
`;

const TypographyWrapper = styled.div`
  padding-right: 9px;
`;

type LinksType = {
  text: string;
  href: string;
};

type Props = {
  title: string;
  image: string;
  links?: LinksType[];
  averageRate: number;
  tags?: string[];
  price: number;
  currency?: string;
};

const CardImageTop = ({
  title,
  image,
  links,
  averageRate,
  tags,
  price,
  currency,
}: Props) => (
  <Card
    imageLocation={CardImageLocation.TOP}
    height="530px"
    width="330px"
    content={
      <SColumn>
        <SRow justifyContent="start">
          <Typography
            size={TypographySize.LARGE}
            as={TypographyTags.H5}
            fontWeight="700"
          >
            {title}
          </Typography>
        </SRow>
        <SRow justifyContent="start" wrap="wrap">
          {links &&
            links.map((item, index) => (
              <SLink key={index}>
                <Link href={item.href}>
                  <Typography
                    size={TypographySize.BIG}
                    as={TypographyTags.BIG}
                    fontWeight="400"
                  >
                    {item.text}
                  </Typography>
                </Link>
              </SLink>
            ))}
        </SRow>
        <RatingWrapper justifyContent="start" wrap="nowrap">
          <AverageRating averageRating={averageRate} />
        </RatingWrapper>
        <SRow justifyContent="start">
          <TypographyWrapper>
            <Typography
              size={TypographySize.VERY_LARGE}
              as={TypographyTags.VERY_LARGE}
              fontWeight="700"
            >
              {price} {currency}
            </Typography>
          </TypographyWrapper>
          <Button
            size={ButtonSizes.BIG}
            icon={<Image src={icon.src} width="35px" height="35px" />}
            iconPosition={ButtonIconPlace.WITH_RIGHT_ICON}
          >
            <TypographyWrapper>
              <Typography size={TypographySize.BIG} as={TypographyTags.BIG}>
                +
              </Typography>
            </TypographyWrapper>
          </Button>
        </SRow>
      </SColumn>
    }
    image={
      <BaseImage height="60%">
        <img src={image} alt="event foto" width="100%" height="100%" />
      </BaseImage>
    }
  >
    <TagList alignItems="end">
      {tags &&
        tags.map((item, index) => (
          <STag key={index}>
            <Tag size={TagSizes.SMALL}>
              <Typography
                size={TypographySize.BIG}
                as={TypographyTags.BIG}
                fontWeight="300"
              >
                {item}
              </Typography>
            </Tag>
          </STag>
        ))}
    </TagList>
  </Card>
);

export default CardImageTop;
