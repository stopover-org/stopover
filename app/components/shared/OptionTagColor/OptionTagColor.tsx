import React from "react";
import useStatusColor from "../../../lib/hooks/useStatusColor";
import Tag from "../../v2/Tag/Tag";

export default React.memo(({ status }: { status: string }) => {
  const color = useStatusColor({
    danger: "not_available",
    primary: "available",
    status,
  });

  return (
    <Tag level="body3" link={false} color={color}>
      {status}
    </Tag>
  );
});
