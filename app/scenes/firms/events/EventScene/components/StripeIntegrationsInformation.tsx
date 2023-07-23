import { graphql, useFragment } from "react-relay";
import React from "react";
import { TabPanel } from "@mui/joy";
import Table from "../../../../../components/v2/Table";
import {
  useStripeIntegrationsColumns,
  useStripeIntegrationsHeaders,
} from "../../../../../components/shared/tables/columns/stripeIntegrations";
import { StripeIntegrationsInformation_EventFragment$key } from "../../../../../artifacts/StripeIntegrationsInformation_EventFragment.graphql";

interface StripeIntegrationsInformationProps {
  eventFragmentRef: StripeIntegrationsInformation_EventFragment$key;
  index: number;
}

const StripeIntegrationsInformation = ({
  eventFragmentRef,
  index,
}: StripeIntegrationsInformationProps) => {
  const event = useFragment<StripeIntegrationsInformation_EventFragment$key>(
    graphql`
      fragment StripeIntegrationsInformation_EventFragment on Event {
        ...stripeIntegrations_EventFragment
      }
    `,
    eventFragmentRef
  );
  const eventOptions = useStripeIntegrationsColumns(event);
  const headers = useStripeIntegrationsHeaders();
  return (
    <TabPanel value={index} size="sm" sx={{ paddingTop: "20px" }}>
      <Table data={eventOptions} headers={headers} />
    </TabPanel>
  );
};

export default React.memo(StripeIntegrationsInformation);
