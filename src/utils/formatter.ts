// スネークケース → キャメルケース変換関数
export const toCamelCase = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase) as unknown as T;
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj as Record<string, any>).map(([key, value]) => [
        key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
        toCamelCase(value),
      ])
    ) as unknown as T;
  }
  return obj;
};
// キャメルケース → スネークケース変換関数
export const toSnakeCase = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase) as unknown as T;
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj as Record<string, any>).map(([key, value]) => [
        key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
        toSnakeCase(value),
      ])
    ) as unknown as T;
  }
  return obj;
};

export const fromJson = <T>(json: string): T => {
  try {
    const parsed: T = JSON.parse(json);
    return parsed;
  } catch (error) {
    throw new Error("Invalid JSON string");
  }
};

export const toJson = <T>(obj: T): string => {
  try {
    const jsonstring: string = JSON.stringify(obj);
    return jsonstring;
  } catch (error) {
    throw new Error("Unable to convert object to JSON string");
  }
};
