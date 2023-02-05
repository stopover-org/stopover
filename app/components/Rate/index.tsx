import React, { Suspense } from "react";
import { graphql, useFragment } from "react-relay";
import { Rate_EventRate$key } from "./__generated__/Rate_EventRate.graphql";
import Row from "../Row";
import AverageRating from "../AverageRating/AverageRating";
import Typography from "../Typography";
import { TypographySize, TypographyTags } from "../StatesEnum";

type Props = {
  eventFragment: Rate_EventRate$key;
};

const Rate = ({ eventFragment }: Props) => {
  const event = useFragment(
    graphql`
      fragment Rate_EventRate on Event {
        averageRating
        ratingsCount
      }
    `,
    eventFragment
  );

  return (
    <Suspense>
      <AverageRating
        averageRating={event?.averageRating || 1}
        countOfStars={5}
      />
      <Row padding="0 0 0 3px">
        <Typography size={TypographySize.BIG} as={TypographyTags.BIG}>
          ({event?.ratingsCount} отзыва)
        </Typography>
      </Row>
    </Suspense>
  );
};

export default Rate;
