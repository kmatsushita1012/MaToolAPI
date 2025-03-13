enum ErrorType {
  INVALID_USER_ID = "INVALID_USER_ID",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  INVALID_INPUT = "INVALID_INPUT",
  DATABASE_ERROR = "DATABASE_ERROR",

}
class CustomError extends Error {
  public errorType: ErrorType;

  constructor(errorType: ErrorType) {
    super();
    this.errorType = errorType;
  }
  
}
