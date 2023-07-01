import { v4 } from "uuid";
import React from "react";

export function useId() {
  return React.useMemo(() => v4(), []);
}
