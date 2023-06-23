import React from "react";

interface StatusColorProps {
  danger?: string;
  info?: string;
  neutral?: string;
  primary?: string;
  success?: string;
  warning?: string;
  status: string | null;
}
export function useStatusColor({
  danger = "",
  info = "",
  neutral = "",
  primary = "",
  success = "",
  warning = "",
  status,
}: StatusColorProps) {
  return React.useMemo(() => {
    if (danger === status) return "danger";
    if (info === status) return "info";
    if (neutral === status) return "neutral";
    if (primary === status) return "primary";
    if (success === status) return "success";
    if (warning === status) return "warning";

    return "primary";
  }, [status]);
}

export default useStatusColor;
