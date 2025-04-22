export class APIError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message?: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const Errors = {
  BadRequest: (msg = "Bad Request") => new APIError(400, msg),
  Unauthorized: (msg = "Unauthorized") => new APIError(401, msg),
  Forbidden: (msg = "Forbidden") => new APIError(403, msg),
  NotFound: (msg = "Not Found") => new APIError(404, msg),
  MethodNotAllowed: (msg = "Method Not Allowed") => new APIError(405, msg),
  Conflict: (msg = "Conflict") => new APIError(409, msg),
  InternalServerError: (msg = "Internal Server Error") =>
    new APIError(500, msg),
  NotImplemented: (msg = "Not Implemented") => new APIError(501, msg),
} as const;
