import React from "react";
import { graphql, useFragment } from "react-relay";
import { Box, Stack } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { EventTitle_EventFragment$key } from "artifacts/EventTitle_EventFragment.graphql";
import Tag from "components/v2/Tag/Tag";
import Typography from "components/v2/Typography";

interface TitleProps {
  eventFragmentRef: EventTitle_EventFragment$key;
}

const EventTitle = ({ eventFragmentRef }: TitleProps) => {
  const { t } = useTranslation();
  const event = useFragment(
    graphql`
      fragment EventTitle_EventFragment on Event {
        title
        averageRating
        tags {
          id
          title
        }
      }
    `,
    eventFragmentRef
  );
  return (
    <Stack>
      <Box>
        <Typography level="h1">{event.title}</Typography>
      </Box>
      <Box>
        <Stack flexDirection="row" alignItems="center">
          {/*          <Rating
            rating={event.averageRating}
            label={t("event.ratingOf", {
              val: event.averageRating || 0,
              max: 5,
            })}
          /> */}
          {event.tags.map((tag) => (
            <Tag key={tag.id} href={`/events?tags=${tag.id}`} primary>
              {tag.title}
            </Tag>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default React.memo(EventTitle);
