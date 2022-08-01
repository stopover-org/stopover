import React from "react";
import { graphql, useFragment } from "react-relay";
import { Card_Event$key } from "./__generated__/Card_Event.graphql";

type Props = {
  eventFragmentRef: Card_Event$key;
};

export function Card({ eventFragmentRef }: Props) {
  const event = useFragment(
    graphql`
      fragment Card_Event on Event {
        title
        description
      }
    `,
    eventFragmentRef
  );

  console.log(event);

  return <div />;
}

export default React.memo(Card);
