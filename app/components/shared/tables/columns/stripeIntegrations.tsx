import React from "react";
import { graphql, useFragment } from "react-relay";
import { stripeIntegrations_EventFragment$key } from "../../../../artifacts/stripeIntegrations_EventFragment.graphql";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import Tag from "../../../v2/Tag/Tag";

const StatusTag = ({ status }: { status: string }) => {
  const color = useStatusColor({
    danger: ["removed"],
    primary: ["active"],
    status,
  });

  return (
    <Tag level="body3" link={false} color={color}>
      {status}
    </Tag>
  );
};

export function useStripeIntegrationsHeaders() {
  return React.useMemo(
    () => [
      { key: "status", width: 100, label: "Status" },
      { key: "belongsTo", width: 150, label: "Belongs To" },
      { key: "priceId", width: 300, label: "Price Id in Stripe" },
      { key: "productId", width: 300, label: "Product Id in Stripe" },
      { key: "version", width: 100, label: "Integration Version" },
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
