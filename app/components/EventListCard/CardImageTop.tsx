import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Card from "../Card";
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
import Rate from "../Rate";
import Tag from "../Tag";
import Row from "../Row";
import Button from "../Button";
import icon from "../icons/Outline/General/Shopping-cart.svg";

const SColumn = styled(Column)`
  padding: 25px;
  height: 60%;
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

type TagType = {
  image?: string;
  content: string;
};
type Props = {
  title: string;
  image: string;
  links: string[];
  rate: number;
  tags: TagType[];
  price: number;
};

const CardImageTop = ({ title, image, links, rate, tags, price }: Props) => {
  const clickHandler = () => {};
  return (
    <Card
      imageLocation={CardImageLocation.TOP}
      height="530px"
      width="330px"
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
              links.map((item) => (
                <SLink>
                  <Link href="../pages/test/tags_test">
                    <Typography
                      size={TypographySize.BIG}
                      as={TypographyTags.BIG}
                      fontWeight="700"
                    >
                      {item}
                    </Typography>
                  </Link>
                </SLink>
              ))}
          </SRow>
          <SRow justifyContent="start">
            <Rate onClick={clickHandler} rate={rate} />
          </SRow>
          <SRow justifyContent="start">
            {tags &&
              tags.map((item) => (
                <STag>
                  <Tag
                    imageSize="30px"
                    size={TagSizes.SMALL}
                    image={item.image}
                  >
                    <Typography>{item.content}</Typography>
                  </Tag>
                </STag>
              ))}
          </SRow>
          <SRow justifyContent="start">
            <TypographyWrapper>
              <Typography
                size={TypographySize.VERY_LARGE}
                as={TypographyTags.VERY_LARGE}
                fontWeight="700"
              >
                {price} $
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
        <BaseImage height="40%">
          <img src={image} alt="event foto" width="100%" height="100%" />
        </BaseImage>
      }
    />
  );
};

export default CardImageTop;
