import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { badRequest, internalServerError, unauthorized } from "../utils/Errors";

type APIGatewayRequest = Request & { apiGateway?: any };

const parseParams = <T>(
  value: Request,
  predicate: (input: ParamsDictionary) => T
): T => {
  try {
    return predicate(value.params);
  } catch (error) {
    throw badRequest(String(error));
  }
};

const parseUserSub = (req: APIGatewayRequest): string => {
  try {
    const sub = req.apiGateway?.event?.requestContext?.authorizer?.claims?.sub;
    if (!sub) {
      throw unauthorized();
    }
    return sub;
  } catch (error) {
    throw internalServerError(String(error));
  }
};

const parseBody = <T>(
  value: Request,
  predicate: (input: any) => T = (input) => {
    return input as T;
  }
): T => {
  try {
    return predicate(value.body);
  } catch (error) {
    throw badRequest(String(error));
  }
};

export { APIGatewayRequest, parseParams, parseBody, parseUserSub };
