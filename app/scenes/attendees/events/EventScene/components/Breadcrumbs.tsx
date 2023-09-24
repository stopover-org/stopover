import { graphql, useFragment } from "react-relay";
import React from "react";
import BreadcrumbsComponent from "../../../../../components/v2/Breadcrumbs";
import { Breadcrumbs_EventFragment$key } from "../../../../../artifacts/Breadcrumbs_EventFragment.graphql";

export const Breadcrumbs = ({
  eventFragmentRef,
}: {
  eventFragmentRef: Breadcrumbs_EventFragment$key;
}) => {
  const event = useFragment<Breadcrumbs_EventFragment$key>(
    graphql`
      fragment Breadcrumbs_EventFragment on Event {
        interests {
          id
          title
          slug
        }
      }
    `,
    eventFragmentRef
  );

  return (
    <BreadcrumbsComponent
      items={event?.interests?.map((interest) => ({
        title: interest.title,
        href: `/events?interest=${interest.slug}`,
      }))}
    />
  );
};

export default React.memo(Breadcrumbs);
