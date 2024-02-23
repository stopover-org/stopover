import React from "react";
import { useTranslation } from "react-i18next";
import useStatusColor from "lib/hooks/useStatusColor";
import Tag from "components/v2/Tag/Tag";
import useEdges from "lib/hooks/useEdges";
import { graphql, useFragment } from "react-relay";
import { accounts_useAccountsColumns_AccountsConnectionFragment$key } from "artifacts/accounts_useAccountsColumns_AccountsConnectionFragment.graphql";

const TagColor = ({ status }: { status: string }) => {
  const color = useStatusColor({
    neutral: ["active"],
    danger: ["disabled"],
    status,
  });
  const { t } = useTranslation();

  return (
    <Tag link={false} color={color}>
      {t(`statuses.${status}`)}
    </Tag>
  );
};

export function useAccountsHeaders() {
  const { t } = useTranslation();
  return React.useMemo(
    () => [
      {
        label: t("models.account.attributes.status"),
        width: 300,
        key: "status",
      },
      {
        label: t("models.account.attributes.primaryEmail"),
        width: 150,
        key: "primaryEmail",
      },
      {
        label: t("models.account.attributes.primaryPhone"),
        width: 150,
        key: "primaryPhone",
      },
      {
        label: t("models.account.attributes.name"),
        width: 100,
        key: "name",
      },
    ],
    []
  );
}

export function useAccountsColumns(
  accountsConnectionFragmentRef: accounts_useAccountsColumns_AccountsConnectionFragment$key
) {
  const accounts =
    useFragment<accounts_useAccountsColumns_AccountsConnectionFragment$key>(
      graphql`
        fragment accounts_useAccountsColumns_AccountsConnectionFragment on AccountConnection {
          edges {
            node {
              user {
                status
              }
              id
              status
              name
              primaryEmail
              primaryPhone
            }
          }
        }
      `,
      accountsConnectionFragmentRef
    );
  const accountsData = useEdges(accounts).map((v) => v!);
  return React.useMemo(
    () =>
      accountsData.map((account) => ({
        status: <TagColor status={account.user.status} />,
        name: account.name,
        primaryEmail: account.primaryEmail,
        primaryPhone: account.primaryPhone,
      })),
    [accounts]
  );
}
