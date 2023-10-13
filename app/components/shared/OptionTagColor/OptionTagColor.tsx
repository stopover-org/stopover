import React from "react";
import { useTranslation } from "react-i18next";
import useStatusColor from "../../../lib/hooks/useStatusColor";
import Tag from "../../v2/Tag";

export default React.memo(({ status }: { status: string }) => {
  const color = useStatusColor({
    danger: ["not_available"],
    primary: ["available"],
    status,
  });
  const { t } = useTranslation();

  return (
    <Tag link={false} color={color}>
      {t(`statuses.${status}`)}
    </Tag>
  );
});
