import { graphql, useFragment } from "react-relay";
import React from "react";
import {
  Avatar,
  List,
  ListDivider,
  ListItem,
  ListItemDecorator,
} from "@mui/joy";
import { useTranslation } from "react-i18next";
import { InterestsSelect_InterestsFragment$key } from "../../../../../artifacts/InterestsSelect_InterestsFragment.graphql";
import Typography from "../../../../../components/v2/Typography";
import { useQuery, useUpdateQuery } from "../../../../../lib/hooks/useQuery";

interface InterestsSelectProps {
  queryFragmentRef: InterestsSelect_InterestsFragment$key;
}

const InterestsSelect = ({ queryFragmentRef }: InterestsSelectProps) => {
  const queryInterests = useQuery('interests')
  const updateInterests = useUpdateQuery('interests')
  const { t } = useTranslation();
  const { interests } = useFragment<InterestsSelect_InterestsFragment$key>(
    graphql`
      fragment InterestsSelect_InterestsFragment on Query {
        interests {
          id
          title
          slug
          preview
        }
      }
    `,
    queryFragmentRef
  );

  const onClick = React.useCallback(
    (slug: string) => () => {
      if (queryInterests.includes(slug)) {
        updateInterests(queryInterests.filter((s: string) => s !== slug));
      } else {
        updateInterests([...queryInterests, slug]);
      }
    },
    [queryInterests, updateInterests]
  );

  return (
    <>
      <Typography fontSize="lg">
        {t("scenes.attendees.events.eventsScene.sidebar.categoriesSubheader")}
      </Typography>
      <List sx={{ height: "500px", overflow: "auto" }}>
        {interests?.map((interest, index) => (
          <React.Fragment key={interest.id}>
            {index !== 0 && index !== interests.length && <ListDivider />}
            <ListItem
              onClick={onClick(interest.slug)}
              color={
                queryInterests.includes(interest.slug) ? "primary" : "neutral"
              }
              variant={
                queryInterests.includes(interest.slug) ? "soft" : "plain"
              }
              sx={{ '&:hover': { cursor: 'pointer', backgroundColor: 'primary' } }}
            >
              <ListItemDecorator>
                <Avatar size="sm" src={interest.preview || undefined} />
              </ListItemDecorator>
              &nbsp;
              {interest.title}
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default React.memo(InterestsSelect);
