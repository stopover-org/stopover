import React from "react";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { stripeIntegrations_EventFragment$key } from "../../../../artifacts/stripeIntegrations_EventFragment.graphql";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import Tag from "../../../v2/Tag/Tag";

const StatusTag = ({ status }: { status: string }) => {
  const color = useStatusColor({
    danger: ["removed"],
    primary: ["active"],
    status,
  });
  const { t } = useTranslation();

  return (
    <Tag link={false} color={color}>
      {t(`statuses.${status}`)}
    </Tag>
  );
};

export function useStripeIntegrationsHeaders() {
  const { t } = useTranslation();
  return React.useMemo(
    () => [
      {
        key: "status",
        width: 100,
        label: t("models.stripeIntegration.attributes.status"),
      },
      {
        key: "belongsTo",
        width: 150,
        label: t("models.stripeIntegration.attributes.stripeableType"),
      },
      {
        key: "priceId",
        width: 300,
        label: t("models.stripeIntegration.attributes.priceId"),
      },
      {
        key: "productId",
        width: 300,
        label: t("models.stripeIntegration.attributes.productId"),
      },
      {
        key: "version",
        width: 100,
        label: t("models.stripeIntegration.attributes.version"),
      },
    ],
    []
  );
}

export function useStripeIntegrationsColumns(
  eventFragmentRef: stripeIntegrations_EventFragment$key
) {
  const event = useFragment<stripeIntegrations_EventFragment$key>(
    graphql`
      fragment stripeIntegrations_EventFragment on Event {
        stripeIntegrations {
          nodes {
            status
            stripeableId
            stripeableType
            priceId
            productId
            version
          }
        }
      }
    `,
    eventFragmentRef
  );

  return React.useMemo(
    () =>
      event.stripeIntegrations.nodes.map((stripeIntegration) => ({
        status: <StatusTag status={stripeIntegration.status} />,
        belongsTo: `${stripeIntegration.stripeableType} (${stripeIntegration.stripeableId})`,
        priceId: stripeIntegration.priceId,
        productId: stripeIntegration.productId,
        version: stripeIntegration.version,
      })),
    [event]
  );
}
