// スネークケース → キャメルケース変換関数
export const toCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
        toCamelCase(value),
      ])
    );
  }
  return obj;
};

// APIリクエスト時にキャメルケース → スネークケース
export const toSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
        toSnakeCase(value),
      ])
    );
  }
  return obj;
};

function fromJson<T>(json: string): T {
  try {
    const parsed: T = JSON.parse(json);
    return parsed;
  } catch (error) {
    throw new Error("Invalid JSON string");
  }
}

function toJson<T>(obj: T): string {
  try {
    const jsonString: string = JSON.stringify(obj);
    return jsonString;
  } catch (error) {
    throw new Error("Unable to convert object to JSON string");
  }
}
