import { Request } from "express";
import { Errors } from "../utils/Errors";
import { UserRole } from "../domain/entities/shared";

// interface AuthenticatedRequest extends Request {
//
//   user: UserRole;
// }

const parseQuery = <T>(
  req: Request,
  predicate: (input: Record<string, any>) => T
): T => {
  try {
    return predicate(req.query);
  } catch (error) {
    throw Errors.BadRequest(String(error));
  }
};

const parseParams = <T>(
  req: Request,
  predicate: (input: Record<string, any>) => T
): T => {
  try {
    return predicate(req.params);
  } catch (error) {
    throw Errors.BadRequest(String(error));
  }
};

const parseBody = <T>(
  req: Request,
  predicate: (input: any) => T = (input) => {
    return input as T;
  }
): T => {
  try {
    return predicate(req.body);
  } catch (error) {
    throw Errors.BadRequest(String(error));
  }
};

export { parseQuery, parseParams, parseBody };
