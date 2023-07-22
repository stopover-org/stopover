import { graphql, useFragment } from "react-relay";
import React from "react";
import { StripeConnectsTable_FirmFragment$key } from "../../../../artifacts/StripeConnectsTable_FirmFragment.graphql";
import {
  useStripeConnectsColumns,
  useStripeConnectsHeaders,
} from "../columns/stripeConnects";
import Table from "../../../v2/Table";

interface StripeConnectsTableProps {
  firmFragmentRef: StripeConnectsTable_FirmFragment$key;
  currentUserFragmentRef: any;
}

const StripeConnectsTable = ({
  firmFragmentRef,
  currentUserFragmentRef,
}: StripeConnectsTableProps) => {
  const firm = useFragment<StripeConnectsTable_FirmFragment$key>(
    graphql`
      fragment StripeConnectsTable_FirmFragment on Firm {
        ...stripeConnects_FirmFragment
      }
    `,
    firmFragmentRef
  );

  const currentUser = useFragment(
    graphql`
      fragment StripeConnectsTable_CurrentUserFragment on User {
        ...stripeConnects_ColumnsRef
        ...stripeConnects_HeadersRef
      }
    `,
    currentUserFragmentRef
  );
  const data = useStripeConnectsColumns(firm, currentUser);
  const headers = useStripeConnectsHeaders(currentUser);
  return <Table data={data} headers={headers} />;
};

export default React.memo(StripeConnectsTable);
