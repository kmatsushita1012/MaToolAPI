class APIError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message?: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

const badRequest = (message?: string) => new APIError(400, "Bad Request");
const unauthorized = (message?: string) =>
  new APIError(401, message || "Unauthorized");
const forbidden = (message?: string) =>
  new APIError(403, message || "Forbidden");
const notFound = (message?: string) =>
  new APIError(404, message || "Not Found");
const methodNotAllowed = (message?: string) =>
  new APIError(405, message || "Method Not Allowed");
const internalServerError = (message?: string) =>
  new APIError(500, message || "Internal Server Error");
const notImplemented = (message?: string) =>
  new APIError(501, message || "Not Implemented");

export {
  APIError,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  methodNotAllowed,
  internalServerError,
  notImplemented,
};
