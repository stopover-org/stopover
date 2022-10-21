const getContainerItemUnit = (container?: boolean, item?: boolean) => {
  if (item) return "auto";
  if (container) return "100%";
  return "100%";
};
export default getContainerItemUnit;
