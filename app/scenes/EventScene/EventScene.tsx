import React from "react";
import Column from "../../components/Column";
import {graphql, useFragment} from "react-relay";
import {Breadcrumbs} from "./components/Breadcrumbs/Breadcrumbs";
import {EventScene_Event$key} from "./__generated__/EventScene_Event.graphql";
import Row from "../../components/Row";
import Typography from "../../components/Typography";
import Button from "../../components/Button";

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
      <Row>
        <Typography size="40px">
          {event.title}
        </Typography>
        <Button>button calendar</Button>
        <Button>book button</Button>
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
