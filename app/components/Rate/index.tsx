import React from "react";
import { graphql, useFragment } from "react-relay";
import RateStar from "./RateStar";
import { Rate_EventRate$key } from "./__generated__/Rate_EventRate.graphql";
import Row from "../Row";

type Props = {
  onClick?: (rateIndex: number) => void;
  readonly?: boolean;
  eventFragment: Rate_EventRate$key;
};

const Rate = ({ onClick, eventFragment, readonly }: Props) => {
  const event = useFragment(
    graphql`
      fragment Rate_EventRate on Event {
        ratingsCount
      }
    `,
    eventFragment
  );

  const rateChange = (index: number) => {
    if (readonly) return;
    if (!(onClick instanceof Function)) return;
    onClick(index);
  };

  return (
    <Row width="140px">
      {new Array(5).fill("").map((_, index) => (
        <RateStar
          selected={index < (event?.ratingsCount || 0)}
          key={index}
          onClick={() => rateChange(index)}
        />
      ))}
    </Row>
  );
};

export default Rate;
