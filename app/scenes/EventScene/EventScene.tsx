import React from "react";
import Column from "../../components/Column";
import {graphql, useFragment} from "react-relay";
import {Breadcrumbs} from "./components/Breadcrumbs/Breadcrumbs";
import {EventScene_Event$key} from "./__generated__/EventScene_Event.graphql";
import Row from "../../components/Row";
import Typography from "../../components/Typography";
import Button from "../../components/Button";
import Calendar from '../../components/icons/Outline/General/Calendar.svg'
import {ButtonIconPlace, ButtonVariants} from "../../components/StatesEnum";
import styled from "styled-components";

const SBookButton = styled(Button)`
  padding-left: 10px;
`

export function EventScene({ eventFragmentRef }: { eventFragmentRef: EventScene_Event$key }) {
  const event = useFragment(graphql`
    fragment EventScene_Event on Event {
      title
      ...Breadcrumbs_Event
    }
  `, eventFragmentRef)

  return (
    <Column>
      <Breadcrumbs eventFragmentRef={event} />
      <Row justifyContent="space-between">
        <Row>
          <Typography size="40px">
            {event.title}
          </Typography>
        </Row>
        <Row justifyContent="flex-end">
          <Button borderRadius="10px" iconPosition={ButtonIconPlace.WITH_RIGHT_ICON} variant={ButtonVariants.OUTLINED} icon={<img src={Calendar.src} />}>
            <Typography size="28px">
              10.08.2022
            </Typography>
          </Button>

          <SBookButton borderRadius="10px">
            <Typography size="28px" color="white">
              book button
            </Typography>
          </SBookButton>
        </Row>
      </Row>
      <div>
        <div>
          left column
          <div>
            <div>rating</div>
            <div>tags</div>
          </div>
          <div>
            gallery
          </div>
          <div>
            map
          </div>
        </div>
        <div>
          <div>address</div>
          <div>description</div>
          <div>booking form</div>
        </div>
      </div>
    </Column>
  )
}

export default React.memo(EventScene)
