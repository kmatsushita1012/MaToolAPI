import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  badRequestResponse,
  methodNotAllowedResponse,
  notFoundResponse,
} from "../../utils/responses";
import RegionController from "../controllers/RegionController";
import { client } from "../..";

const controller = new RegionController(client);

export const regionRouter = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const path = event.path;
  const httpMethod = event.httpMethod;
  if (!path) {
    return badRequestResponse();
  }

  if (path.startsWith("/regions/summaries")) {
    if (httpMethod == "GET") {
      return await controller.getSummaries(event);
    } else {
      return methodNotAllowedResponse();
    }
  } else if (path.startsWith("/regions/detail")) {
    if (httpMethod == "GET") {
      return await controller.getDetail(event);
    } else {
      return methodNotAllowedResponse();
    }
  } else if (path.startsWith("/regions")) {
    if (httpMethod == "POST") {
      return await controller.post(event);
    } else {
      return methodNotAllowedResponse();
    }
  } else {
    return notFoundResponse();
  }
};

export default regionRouter;
