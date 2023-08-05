import React from "react";
import { graphql, useFragment } from "react-relay";
import { Stack } from "@mui/joy";
import moment from "moment/moment";
import { stripeConnects_FirmFragment$key } from "../../../../artifacts/stripeConnects_FirmFragment.graphql";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import Tag from "../../../v2/Tag/Tag";
import VerifyStripeConnect from "../../VerifyStripeConnect";
import DeclineStripeConnect from "../../DeclineStripeConnect";
import { getHumanDateTime } from "../../../../lib/utils/dates";

export function useStripeConnectsHeaders(currentUserFragmentRef: any) {
  const currentUser = useFragment(
    graphql`
      fragment stripeConnects_HeadersRef on User {
        serviceUser
      }
    `,
    currentUserFragmentRef
  );
  return React.useMemo(
    () => [
      {
        label: "Status",
        key: "status",
      },
      {
        label: "Activated At",
        key: "activatedAt",
      },
      {
        label: "Created At",
        key: "createdAt",
      },
      {
        label: "Updated At",
        key: "updatedAt",
      },
      currentUser?.serviceUser && {
        label: "Actions",
        key: "actions",
      },
    ],
    [currentUser]
  );
}
const StatusTag = ({ status }: { status: string }) => {
  const color = useStatusColor({
    danger: ["removed", "inactive"],
    primary: ["active"],
    neutral: ["pending"],
    status,
  });

  return (
    <Tag level="body3" link={false} color={color}>
      {status}
    </Tag>
  );
};

export function useStripeConnectsColumns(
  firmFragmentRef: stripeConnects_FirmFragment$key,
  currentUserFragmentRef: any
) {
  const firm = useFragment<stripeConnects_FirmFragment$key>(
    graphql`
      fragment stripeConnects_FirmFragment on Firm {
        stripeConnects {
          status
          activatedAt
          createdAt
          updatedAt
          ...VerifyStripeConnect_StripeConnect
          ...DeclineStripeConnect_StripeConnect
        }
      }
    `,
    firmFragmentRef
  );

  const currentUser = useFragment(
    graphql`
      fragment stripeConnects_ColumnsRef on User {
        account {
          firm {
            id
          }
        }
      }
    `,
    currentUserFragmentRef
  );

  return React.useMemo(() => {
    const activeStripeAccount = firm.stripeConnects.find(
      (stripeConnect) => stripeConnect.status === "active"
    );
    return firm.stripeConnects.map((stripeConnect) => ({
      status: <StatusTag status={stripeConnect.status} />,
      activatedAt: stripeConnect.activatedAt
        ? getHumanDateTime(moment(stripeConnect.activatedAt))
        : "Not Activated",
      createdAt: getHumanDateTime(moment(stripeConnect.createdAt)),
      updatedAt: getHumanDateTime(moment(stripeConnect.updatedAt)),
      actions: currentUser?.account?.firm?.id && (
        <Stack direction="row">
          {!activeStripeAccount &&
            ["inactive", "pending"].includes(stripeConnect.status) && (
              <VerifyStripeConnect stripeConnectRef={stripeConnect} />
            )}
          {["active", "pending"].includes(stripeConnect.status) && (
            <DeclineStripeConnect stripeConnectRef={stripeConnect} />
          )}
          {["inactive", "pending"].includes(stripeConnect.status) && (
            <DeclineStripeConnect stripeConnectRef={stripeConnect} force />
          )}
        </Stack>
      ),
    }));
  }, [firm.stripeConnects]);
}
