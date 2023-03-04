import React, { Suspense, useState } from "react";
import { graphql, useFragment } from "react-relay";
import styled from "styled-components";
import Column from "../../components/Layout/Column";
import { Breadcrumbs } from "./components/Breadcrumbs/Breadcrumbs";
import { EventScene_Event$key } from "./__generated__/EventScene_Event.graphql";
import Row from "../../components/Layout/Row";
import Typography from "../../components/v2/Typography";
import Button from "../../components/v1/Button";
import Calendar from "../../components/icons/Outline/General/Calendar.svg";
import {
  ButtonIconPlace,
  ButtonVariants,
  TagSizes,
} from "../../components/StatesEnum";
import Rate from "../../components/v1/Rate";
import Tag from "../../components/v2/Tag";
import { getCurrencyFormat } from "../../lib/utils/currencyFormatter";
import Gallery from "../../components/v2/Gallery";
import Description from "../../components/Description";

const SBookButton = styled(Button)`
  padding-left: 10px;
`;

export const EventScene = ({
  eventFragmentRef,
}: {
  eventFragmentRef: EventScene_Event$key;
}) => {
  const event = useFragment(
    graphql`
      fragment EventScene_Event on Event {
        title
        tags {
          title
        }
        attendeePricePerUom {
          cents
          currency {
            name
            symbol
            fullName
          }
        }
        images
        fullAddress
        description
        ...Breadcrumbs_Event
        ...Rate_EventRate
      }
    `,
    eventFragmentRef
  );
  const tags = event?.tags || [];
  const attendeePricePerUom = event?.attendeePricePerUom;
  const images = event?.images;
  const address = event?.fullAddress;
  const description = event?.description;
  const [isOpen, setIsOpen] = useState(false);
  // TODO: delete this array
  const ZimagesArray: any = [
    {
      src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
      title: "Boating",
    },
    { src: "https://via.placeholder.com/500x200", title: "cycling" },
    {
      src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
      title: "nord hiking",
    },
    { src: "https://via.placeholder.com/500x75", title: "eating" },
    {
      src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
      title: "family cycling",
    },
    {
      src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
      title: "diving",
    },
  ];
  // TODO: delet this strings
  const Zaddress = "Brno, Podebradova, Kralove-pole";
  const Zdescription =
    "<p> Lorem pisum dolor sit amet, consectetur adpisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscpit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><br><p> Lorem pisum dolor sit amet, consectetur adpisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscpit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><br><p> Lorem pisum dolor sit amet, consectetur adpisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscpit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><br><p> Lorem pisum dolor sit amet, consectetur adpisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscpit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>";

  return (
    <Column border="1px solid green">
      <Breadcrumbs eventFragmentRef={event} />
      <Row justifyContent="space-between">
        <Row>
          <Typography size="40px">{event.title}</Typography>
        </Row>
        <Row justifyContent="flex-end">
          <Button
            borderRadius="10px"
            iconPosition={ButtonIconPlace.WITH_RIGHT_ICON}
            variant={ButtonVariants.OUTLINED}
            icon={<img alt="calendar" src={Calendar.src} />}
          >
            <Typography size="28px">10.08.2022</Typography>
          </Button>

          <SBookButton borderRadius="10px">
            <Typography size="28px" color="white">
              book button
            </Typography>
          </SBookButton>
        </Row>
      </Row>
      <Row justifyContent="space-between">
        <Row justifyContent="flex-start" container>
          <Rate eventFragment={event} />
          {tags.map(({ title }) => (
            <Row item padding="0 5px 0 5px">
              <Tag size={TagSizes.MEDIUM}>{title}</Tag>
            </Row>
          ))}
        </Row>
        <Row justifyContent="flex-end" padding="10px 0 0 0">
          Price for Unit:
          <Suspense>
            {getCurrencyFormat(
              attendeePricePerUom?.cents,
              attendeePricePerUom?.currency.name
            )}
          </Suspense>
        </Row>
      </Row>

      <Row border="1px solid red" flex={1}>
        <Column border="1px solid blue" flex={6}>
          <Gallery
            opened={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            images={images.map((image) => ({ src: image }))}
            numberInRow={2}
            minHeight="450px"
            maxHeight="none"
            width="100%"
          />
        </Column>

        <Column border="1px solid blue" flex={4}>
          <Row flexDirection="row-reverse">
            <Typography size="20px">{address}</Typography>
          </Row>
          <Description height="350px" background="#ddd" text={description} />
        </Column>
      </Row>

      <div>
        <div>
          left column
          <div>gallery</div>
          <div>map</div>
        </div>
        <div>
          <div>address</div>
          <div>
            <div dangerouslySetInnerHTML={{ __html: event?.description }} />
          </div>
          <div>booking form</div>
        </div>
      </div>
    </Column>
  );
};

export default React.memo(EventScene);
