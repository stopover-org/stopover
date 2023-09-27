import { graphql, useFragment } from "react-relay";
import React from "react";
import {
  Avatar,
  List,
  ListDivider,
  ListItem,
  ListItemDecorator,
} from "@mui/joy";
import { useRouter } from "next/router";
import { stringify } from "qs";
import { InterestsSelect_InterestsFragment$key } from "../../../../../artifacts/InterestsSelect_InterestsFragment.graphql";
import Typography from "../../../../../components/v2/Typography";

interface InterestsSelectProps {
  queryFragmentRef: InterestsSelect_InterestsFragment$key;
}

const InterestsSelect = ({ queryFragmentRef }: InterestsSelectProps) => {
  const router = useRouter();
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
  const q = { ...router.query };
  const queryInterests = (
    Array.isArray(q["interests[]"]) ? q["interests[]"] : [q["interests[]"]]
  ).filter(Boolean) as string[];

  const onClick = React.useCallback(
    (slug: string) => () => {
      if (queryInterests.includes(slug)) {
        q.interests = queryInterests.filter((s) => s !== slug);
      } else {
        q.interests = [...queryInterests, slug];
      }

      delete q["interests[]"];

      const url = `/events?${stringify(q, {
        arrayFormat: "brackets",
        encode: false,
      })}`;

      router.push(url);
    },
    [router, queryInterests]
  );

  return (
    <>
      <Typography fontSize="lg">Categories</Typography>
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
