import React from "react";
import { graphql, useFragment } from "react-relay";
import { Card_Event$key } from "./__generated__/Card_Event.graphql";

type Props = {
  eventFragmentRef: Card_Event$key;
};

export function Card({ eventFragmentRef }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const event = useFragment(
    graphql`
      fragment Card_Event on Event {
        title
        description
      }
    `,
    eventFragmentRef
  );

  return <div />;
}

export default React.memo(Card);
