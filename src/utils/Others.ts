export const isEmpty = (value: any): boolean => {
  if (!value) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (value && typeof value === "object")
    return Object.keys(value).length === 0;
  return !value;
};

export async function tryOrNull<T>(fn: Promise<T>): Promise<T | null> {
  try {
    return await fn;
  } catch {
    return null;
  }
}