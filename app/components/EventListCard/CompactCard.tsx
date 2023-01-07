import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { graphql, useFragment } from "react-relay";
import Card from "../Card";
import AverageRating from "../AverageRating/AverageRating";
import {
  ButtonIconPlace,
  ButtonSizes,
  CardImageLocation,
  TagSizes,
  TypographySize,
  TypographyTags,
} from "../StatesEnum";
import Typography from "../Typography";
import BaseImage from "../BaseImage";
import Column from "../Column";
import Link from "../Link";
import Tag from "../Tag";
import Row from "../Row";
import Button from "../Button";
import icon from "../icons/Outline/General/Shopping_cart_white.svg";
import { CompactCard_EventFragment$key } from "./__generated__/CompactCard_EventFragment.graphql";

const TextHeight = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
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

const SCommentsRating = styled(Typography)`
  padding-left: 3px;
`;

const TagOverImage = styled.div`
  padding: 10px;
`;

const TypographyWrapper = styled.div`
  padding-right: 9px;
`;

type Props = {
  currency?: string;
  eventRef: CompactCard_EventFragment$key;
};

const CompactCard = ({ currency, eventRef }: Props) => {
  const {
    title,
    id,
    description,
    images,
    tags,
    interests,
    attendeePricePerUomCents,
    averageRating,
    ratingsCount,
  } = useFragment(
    graphql`
      fragment CompactCard_EventFragment on Event {
        title
        description
        id
        availableDates
        images
        attendeePricePerUomCents
        tags {
          title
          link
          id
        }
        interests {
          title
          link
          id
        }
        averageRating
        ratingsCount
      }
    `,
    eventRef
  );

  return (
    <Card
      as="a"
      href={`/events/${id}`}
      imageLocation={CardImageLocation.LEFT}
      height="440px"
      width="1060px"
      childrenRight="60%"
      content={
        <SColumn justifyContent="start" height="100%">
          <SRow justifyContent="start">
            <Typography size="22px" as={TypographyTags.H5}>
              {title}
            </Typography>
          </SRow>
          <SRow justifyContent="start">
            {interests.map(({ link, title: interestTitle, id: interestId }) => (
              <SLink key={`interest-${id}-${interestId}`}>
                <Link href={link!}>
                  <Typography size={TypographySize.BIG} as={TypographyTags.BIG}>
                    {interestTitle}
                  </Typography>
                </Link>
              </SLink>
            ))}
          </SRow>
          <SRow justifyContent="start" alignItems="end">
            <AverageRating averageRating={averageRating} />
            <SCommentsRating>
              <Typography size={TypographySize.BIG} as={TypographyTags.BIG}>
                ({ratingsCount} отзыва)
              </Typography>
            </SCommentsRating>
          </SRow>
          <SRow justifyContent="start" wrap="wrap">
            {tags.map(({ id: tagId, title: tagTitle }) => (
              <STag key={`tag-${id}-${tagId}`}>
                <Tag size={TagSizes.SMALL}>
                  <Typography size={TypographySize.BIG} as={TypographyTags.BIG}>
                    {tagTitle}
                  </Typography>
                </Tag>
              </STag>
            ))}
          </SRow>
          <SRow alignItems="start" height="100%">
            <TextHeight size={TypographySize.BIG}>{description}</TextHeight>
          </SRow>
          <SRow justifyContent="end">
            <TypographyWrapper>
              <Typography
                lineHeight="60px"
                size="26px"
                as={TypographyTags.VERY_LARGE}
              >
                {attendeePricePerUomCents} {currency}
              </Typography>
            </TypographyWrapper>
            <Button
              size={ButtonSizes.BIG}
              icon={<Image src={icon.src} width="35px" height="35px" />}
              iconPosition={ButtonIconPlace.WITH_RIGHT_ICON}
              borderRadius="10px"
            >
              <Typography size="28px" as={TypographyTags.BIG} color="white">
                +
              </Typography>
            </Button>
          </SRow>
        </SColumn>
      }
      image={
        <BaseImage width="40%">
          <img src={images[0]} alt="event" height="100%" />
        </BaseImage>
      }
    >
      {tags && (
        <TagOverImage>
          <Tag size={TagSizes.SMALL}>
            <Typography size={TypographySize.BIG} as={TypographyTags.BIG}>
              {tags[0].title}
            </Typography>
          </Tag>
        </TagOverImage>
      )}
    </Card>
  );
};

export default CompactCard;
