import React, { Suspense } from "react";
import styled from "styled-components";
import Image from "next/image";
import { graphql, useFragment } from "react-relay";
import Card from "../v2/Card";
import AverageRating from "../v1/AverageRating/AverageRating";
import {
  ButtonIconPlace,
  ButtonSizes,
  CardImageLocation,
  TagSizes,
  TypographySize,
  TypographyTags,
} from "../StatesEnum";
import Typography from "../v2/Typography";
import BaseImage from "../v1/BaseImage";
import Column from "../Layout/Column";
import Link from "../v1/Link";
import Tag from "../v2/Tag";
import Row from "../Layout/Row";
import Button from "../v1/Button";
import icon from "../icons/Outline/General/Shopping_cart_white.svg";
import { WideCard_EventFragment$key } from "./__generated__/WideCard_EventFragment.graphql";
import { getCurrencyFormat } from "../../lib/utils/currencyFormatter";
import TagList from "./components/TagList";

const SColumn = styled(Column)`
  padding: 20px;
  height: 40%;
`;

const SRow = styled(Row)`
  padding-top: 5px;
  padding-bottom: 5px;
`;

const RatingWrapper = styled(Row)`
  padding-bottom: 20px;
`;

const SCommentsRating = styled(Typography)`
  padding-left: 3px;
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

type Props = {
  eventRef: WideCard_EventFragment$key;
};

const WideCard = ({ eventRef }: Props) => {
  const {
    title,
    id,
    images,
    tags,
    interests,
    attendeePricePerUom,
    averageRating,
    ratingsCount,
  } = useFragment(
    graphql`
      fragment WideCard_EventFragment on Event {
        title
        description
        id
        availableDates
        images
        attendeePricePerUom {
          cents
          currency {
            name
            symbol
            fullName
          }
        }
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
      imageLocation={CardImageLocation.TOP}
      height="530px"
      width="330px"
      as="a"
      href={`/events/${id}`}
      content={
        <SColumn>
          <SRow justifyContent="start">
            <Typography size="22px" as={TypographyTags.H5}>
              {title}
            </Typography>
          </SRow>
          <SRow justifyContent="start" wrap="wrap">
            {interests.map(({ id: interestId, link, title: interestTitle }) => (
              <SLink key={`interest-${id}-${interestId}`}>
                <Link href={link!}>
                  <Typography size={TypographySize.BIG} as={TypographyTags.BIG}>
                    {interestTitle}
                  </Typography>
                </Link>
              </SLink>
            ))}
          </SRow>
          <RatingWrapper justifyContent="start" alignItems="end">
            <AverageRating averageRating={averageRating} />
            <SCommentsRating>
              <Typography size={TypographySize.BIG} as={TypographyTags.BIG}>
                ({ratingsCount} отзыва)
              </Typography>
            </SCommentsRating>
          </RatingWrapper>
          <SRow justifyContent="start">
            <TypographyWrapper>
              <Typography
                lineHeight="60px"
                size="26px"
                as={TypographyTags.VERY_LARGE}
              >
                <Suspense>
                  {getCurrencyFormat(
                    attendeePricePerUom?.cents,
                    attendeePricePerUom?.currency.name
                  )}
                </Suspense>
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
        <BaseImage height="60%">
          <img src={images[0]} alt="event" height="100%" />
        </BaseImage>
      }
    >
      <TagList alignItems="end">
        {tags.map(({ id: tagId, title: tagTitle }) => (
          <STag key={`tag-${tagId}`}>
            <Tag size={TagSizes.SMALL}>
              <Typography size={TypographySize.BIG} as={TypographyTags.BIG}>
                {tagTitle}
              </Typography>
            </Tag>
          </STag>
        ))}
      </TagList>
    </Card>
  );
};

export default WideCard;
