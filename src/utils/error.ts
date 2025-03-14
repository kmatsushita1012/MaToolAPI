export class APIError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message?: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const badRequest = (message?: string) =>
  new APIError(400, "Bad Request");
export const unauthorized = (message?: string) =>
  new APIError(401, message || "Unauthorized");
export const forbidden = (message?: string) =>
  new APIError(403, message || "Forbidden");
export const notFound = (message?: string) =>
  new APIError(404, message || "Not Found");
export const methodNotAllowed = (message?: string) =>
  new APIError(405, message || "Method Not Allowed");
export const internalServerError = (message?: string) =>
  new APIError(500, message || "Internal Server Error");
export const notImplemented = (message?: string) =>
  new APIError(501, message || "Not Implemented");
