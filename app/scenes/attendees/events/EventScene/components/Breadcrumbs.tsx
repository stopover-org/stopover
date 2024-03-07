import { graphql, useFragment } from "react-relay";
import React from "react";
import BreadcrumbsComponent from "components/v2/Breadcrumbs";
import { Breadcrumbs_EventFragment$key } from "artifacts/Breadcrumbs_EventFragment.graphql";
import { useTranslation } from "react-i18next";

export const Breadcrumbs = ({
  eventFragmentRef,
}: {
  eventFragmentRef: Breadcrumbs_EventFragment$key;
}) => {
  const { t } = useTranslation();
  const event = useFragment<Breadcrumbs_EventFragment$key>(
    graphql`
      fragment Breadcrumbs_EventFragment on Event {
        firm {
          id
          title
        }
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
      items={[
        {
          title: event.firm.title,
          subtitle: t("models.firm.singular"),
          href: `/firms/${event.firm.id}`,
        },
        ...event.interests.map((interest) => ({
          title: interest.title,
          subtitle: t("models.interest.singular"),
          href: `/interests/${slug}`,
        })),
      ]}
    />
  );
};

export default React.memo(Breadcrumbs);
