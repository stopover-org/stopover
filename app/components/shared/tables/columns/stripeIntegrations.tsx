import React from "react";
import { graphql, useFragment } from "react-relay";
import { stripeIntegrations_EventFragment$key } from "../../../../artifacts/stripeIntegrations_EventFragment.graphql";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import Tag from "../../../v2/Tag/Tag";

const StatusTag = ({ status }: { status: string }) => {
  const color = useStatusColor({
    danger: ["deleted"],
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
      { key: "status", label: "Status" },
      { key: "belongsTo", label: "Belongs To" },
      { key: "priceType", label: "Price Type" },
      { key: "priceId", label: "Price Id in Stripe" },
      { key: "productId", label: "Product Id in Stripe" },
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
            priceType
            priceId
            productId
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
        priceType: stripeIntegration.priceType,
        priceId: stripeIntegration.priceId,
        productId: stripeIntegration.productId,
      })),
    [event]
  );
}
