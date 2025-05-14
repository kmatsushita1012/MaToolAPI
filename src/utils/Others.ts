export const isEmpty = (value: any): boolean => {
  if (!value) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (value && typeof value === "object")
    return Object.keys(value).length === 0;
  return !value;
};
