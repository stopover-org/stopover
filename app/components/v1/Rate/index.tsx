import React, { Suspense } from "react";
import { graphql, useFragment } from "react-relay";
import { Rate_EventRate$key } from "./__generated__/Rate_EventRate.graphql";
import Row from "../../Layout/Row";
import AverageRating from "../AverageRating/AverageRating";
import Typography from "../Typography";
import { TypographySize, TypographyTags } from "../../StatesEnum";

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
      <Row justifyContent="flex-start" alignItems="flex-end" item>
        <AverageRating
          averageRating={event?.averageRating || 1}
          countOfStars={5}
        />
        <Typography size={TypographySize.BIG} as={TypographyTags.BIG}>
          &nbsp;
          {event?.averageRating} ({event?.ratingsCount} отзыва)
        </Typography>
      </Row>
    </Suspense>
  );
};

export default Rate;
