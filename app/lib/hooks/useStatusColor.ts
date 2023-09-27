import React from "react";

interface StatusColorProps {
  danger?: string[];
  info?: string[];
  neutral?: string[];
  primary?: string[];
  success?: string[];
  warning?: string[];
  status: string | null;
}
export function useStatusColor({
  danger = [""],
  neutral = [""],
  primary = [""],
  success = [""],
  warning = [""],
  status,
}: StatusColorProps) {
  return React.useMemo(() => {
    if (!status) return "primary";

    if (danger.includes(status)) return "danger";
    if (neutral.includes(status)) return "neutral";
    if (primary.includes(status)) return "primary";
    if (success.includes(status)) return "success";
    if (warning.includes(status)) return "warning";

    return "primary";
  }, [status]);
}

export default useStatusColor;
