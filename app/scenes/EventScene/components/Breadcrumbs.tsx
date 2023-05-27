import { graphql, useFragment } from "react-relay";
import React from "react";
import BreadcrumbsComponent from "../../../components/v2/Breadcrumbs";
import { Breadcrumbs_EventFragment$key } from "./__generated__/Breadcrumbs_EventFragment.graphql";

export const Breadcrumbs = ({
  eventFragmentRef,
}: {
  eventFragmentRef: Breadcrumbs_EventFragment$key;
}) => {
  const event = useFragment(
    graphql`
      fragment Breadcrumbs_EventFragment on Event {
        interests {
          id
          title
        }
      }
    `,
    eventFragmentRef
  );

  return (
    <BreadcrumbsComponent
      items={event?.interests?.map((interest) => interest.title)}
    />
  );
};

export default React.memo(Breadcrumbs);
