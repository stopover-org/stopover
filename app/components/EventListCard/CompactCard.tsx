import React, { Suspense } from "react";
import styled from "styled-components";
import Image from "next/image";
import { graphql, useFragment } from "react-relay";
import Card from "../v1/Card";
import {
  ButtonIconPlace,
  ButtonSizes,
  CardImageLocation,
  TagSizes,
  TypographySize,
  TypographyTags,
} from "../StatesEnum";
import Typography from "../v1/Typography";
import BaseImage from "../v1/BaseImage";
import Column from "../Layout/Column";
import Link from "../v1/Link";
import Tag from "../v1/Tag";
import Row from "../Layout/Row";
import Button from "../v1/Button";
import icon from "../icons/Outline/General/Shopping_cart_white.svg";
import { CompactCard_EventFragment$key } from "./__generated__/CompactCard_EventFragment.graphql";
import { getCurrencyFormat } from "../../lib/utils/currencyFormatter";
import Rate from "../v1/Rate";
import TagList from "./components/TagList";

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
  padding-bottom: 10px;
`;

const TypographyWrapper = styled.div`
  padding-right: 9px;
`;

type Props = {
  eventRef: CompactCard_EventFragment$key;
};

const CompactCard = ({ eventRef }: Props) => {
  const event = useFragment(
    graphql`
      fragment CompactCard_EventFragment on Event {
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
        ...Rate_EventRate
      }
    `,
    eventRef
  );

  return (
    <Card
      as="a"
      href={`/events/${event?.id}`}
      imageLocation={CardImageLocation.LEFT}
      height="440px"
      width="1060px"
      childrenRight="60%"
      content={
        <SColumn justifyContent="start" height="100%">
          <SRow justifyContent="start">
            <Typography size="22px" as={TypographyTags.H5}>
              {event?.title}
            </Typography>
          </SRow>
          <SRow justifyContent="start">
            {event?.interests.map(
              ({ link, title: interestTitle, id: interestId }) => (
                <SLink key={`interest-${event?.id}-${interestId}`}>
                  <Link href={link!}>
                    <Typography
                      size={TypographySize.BIG}
                      as={TypographyTags.BIG}
                    >
                      {interestTitle}
                    </Typography>
                  </Link>
                </SLink>
              )
            )}
          </SRow>
          <SRow justifyContent="start" alignItems="end">
            <Rate eventFragment={event} />
          </SRow>
          <SRow alignItems="start" height="100%">
            <TextHeight size={TypographySize.BIG}>
              {event?.description}
            </TextHeight>
          </SRow>
          <SRow justifyContent="end">
            <TypographyWrapper>
              <Typography
                lineHeight="60px"
                size="26px"
                as={TypographyTags.VERY_LARGE}
              >
                <Suspense>
                  {getCurrencyFormat(
                    event?.attendeePricePerUom?.cents,
                    event?.attendeePricePerUom?.currency.name
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
        <BaseImage width="40%">
          <img src={event?.images[0]} alt="event" height="100%" />
          <TagList alignItems="end">
            {event?.tags.map(({ id: tagId, title: tagTitle }) => (
              <STag key={`tag-${tagId}`}>
                <Tag size={TagSizes.SMALL}>
                  <Typography size={TypographySize.BIG} as={TypographyTags.BIG}>
                    {tagTitle}
                  </Typography>
                </Tag>
              </STag>
            ))}
          </TagList>
        </BaseImage>
      }
    />
  );
};

export default CompactCard;
