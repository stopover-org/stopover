import React from "react";
import { graphql, useFragment } from "react-relay";
import styled from "styled-components";
import Column from "../../components/Column";
import { Breadcrumbs } from "./components/Breadcrumbs/Breadcrumbs";
import { EventScene_Event$key } from "./__generated__/EventScene_Event.graphql";
import Row from "../../components/Row";
import Typography from "../../components/Typography";
import Button from "../../components/Button";
import Calendar from "../../components/icons/Outline/General/Calendar.svg";
import {
  ButtonIconPlace,
  ButtonVariants,
  TagSizes,
} from "../../components/StatesEnum";
import Rate from "../../components/Rate";
import Tag from "../../components/Tag";

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
        ...Breadcrumbs_Event
        ...Rate_EventRate
      }
    `,
    eventFragmentRef
  );
  const tags = event?.tags || [];

  return (
    <Column>
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
      <Row>
        <Row justifyContent="flex-start">
          <Rate readonly eventFragment={event} />
          {tags.map(({ title }) => (
            <Row item padding="0 5px 0 5px">
              <Tag size={TagSizes.MEDIUM}>{title}</Tag>
            </Row>
          ))}
        </Row>
        <Row justifyContent="flex-end" padding="10px 0 0 0">
          Price for Unit: $100000
        </Row>
      </Row>
      <div>
        <div>
          left column
          <div>gallery</div>
          <div>map</div>
        </div>
        <div>
          <div>address</div>
          <div>description</div>
          <div>booking form</div>
        </div>
      </div>
    </Column>
  );
};

export default React.memo(EventScene);
