export const getContainerItemUnit = (
  container?: boolean,
  item?: boolean,
  defaultValue?: string
) => {
  if (item) return "auto";
  if (container) return "100%";
  return defaultValue || "unset";
};
export default getContainerItemUnit();
