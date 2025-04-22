export const toCamelCase = <T>(input: Record<string, any> | Array<any>): T => {
  if (Array.isArray(input)) {
    return input.map(toCamelCase) as unknown as T;
  } else if (typeof input === "object" && input !== null) {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [
        key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
        toCamelCase(value),
      ])
    ) as unknown as T;
  }
  return input as unknown as T;
};

export const toSnakeCase = (input: any): Record<string, any> | Array<any> => {
  if (Array.isArray(input)) {
    return input.map(toSnakeCase);
  } else if (typeof input === "object" && input !== null) {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [
        key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
        toSnakeCase(value),
      ])
    );
  }
  return input;
};
