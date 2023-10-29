import React from "react";
import { graphql, useFragment } from "react-relay";
import { Stack } from "@mui/joy";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return React.useMemo(
    () => [
      {
        label: t("models.stripeConnect.attributes.status"),
        width: 100,
        key: "status",
      },
      {
        label: t("models.stripeConnect.attributes.activatedAt"),
        width: 150,
        key: "activatedAt",
      },
      {
        label: t("models.stripeConnect.attributes.createdAt"),
        width: 150,
        key: "createdAt",
      },
      {
        label: t("models.stripeConnect.attributes.updatedAt"),
        width: 150,
        key: "updatedAt",
      },
      currentUser.serviceUser && {
        label: t("general.actions"),
        width: 100,
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
  const { t } = useTranslation();

  return (
    <Tag link={false} color={color}>
      {t(`statuses.${status}`)}
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
  const { t } = useTranslation();

  return React.useMemo(() => {
    const activeStripeAccount = firm?.stripeConnects?.find(
      (stripeConnect) => stripeConnect.status === "active"
    );
    return firm?.stripeConnects?.map((stripeConnect) => ({
      status: <StatusTag status={stripeConnect.status} />,
      activatedAt: stripeConnect.activatedAt
        ? getHumanDateTime(moment(stripeConnect.activatedAt))
        : t("statuses.inactive"),
      createdAt: getHumanDateTime(moment(stripeConnect.createdAt)),
      updatedAt: getHumanDateTime(moment(stripeConnect.updatedAt)),
      actions: currentUser.account.firm?.id && (
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
