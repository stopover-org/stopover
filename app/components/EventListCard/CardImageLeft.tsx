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

const TextHeight = styled.div`
  min-height: 20px;
  max-height: 195px;
  overflow: hidden;
`;

const SColumn = styled(Column)`
  padding: 25px;
  width: 60%;
`;

const SRow = styled(Row)`
  padding-top: 5px;
  padding-bottom: 5px;
`;

const SLink = styled.div`
  padding-right: 10px;
`;

const STag = styled.div`
  padding-right: 10px;
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
  links: LinksType[];
  averageRate: number;
  tags: string[];
  price: number;
  text: React.ReactElement;
  currency: string;
};

const CardImageLeft = ({
  title,
  image,
  links,
  averageRate,
  tags,
  price,
  text,
  currency,
}: Props) => (
  <Card
    imageLocation={CardImageLocation.LEFT}
    height="440px"
    width="1060px"
    content={
      <SColumn justifyContent="space-between">
        <SRow justifyContent="start">
          <Typography
            size={TypographySize.LARGE}
            as={TypographyTags.H5}
            fontWeight="700"
          >
            {title}
          </Typography>
        </SRow>
        <SRow justifyContent="start">
          {links &&
            links.map((item, index) => (
              <SLink key={index}>
                <Link href={item.href}>
                  <Typography
                    size={TypographySize.BIG}
                    as={TypographyTags.BIG}
                    fontWeight="700"
                  >
                    {item.text}
                  </Typography>
                </Link>
              </SLink>
            ))}
        </SRow>
        <SRow justifyContent="start">
          <AverageRating averageRating={averageRate} />
        </SRow>
        <SRow justifyContent="start" wrap="wrap">
          {tags &&
            tags.map((item, index) => (
              <STag key={index}>
                <Tag size={TagSizes.SMALL}>
                  <Typography>{item}</Typography>
                </Tag>
              </STag>
            ))}
        </SRow>
        <SRow justifyContent="start">
          <TextHeight>{text}</TextHeight>
        </SRow>
        <SRow justifyContent="end">
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
      <BaseImage width="40%">
        <img src={image} alt="event foto" width="100%" height="100%" />
      </BaseImage>
    }
  />
);

export default CardImageLeft;
