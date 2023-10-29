import React from "react";
import { v4 } from "uuid";

export function useIds(data: Record<string, any>[]) {
  return React.useMemo(() => data?.map(({ id }) => id || v4()), [data]);
}
