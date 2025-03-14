import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import RegionController from "../controllers/RegionController";
import { client } from "../..";
import { errorResponse } from "../../utils/responses";
import { badRequest, methodNotAllowed, notFound } from "../../utils/error";

const controller = new RegionController(client);

export const regionRouter = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const path = event.path;
  const httpMethod = event.httpMethod;
  if (!path) {
    return errorResponse(badRequest());
  }

  if (path.startsWith("/regions/summaries")) {
    if (httpMethod == "GET") {
      return await controller.getSummaries(event);
    } else {
      return errorResponse(methodNotAllowed());
    }
  } else if (path.startsWith("/regions/detail")) {
    if (httpMethod == "GET") {
      return await controller.getDetail(event);
    } else {
      return errorResponse(methodNotAllowed());
    }
  } else if (path.startsWith("/regions")) {
    if (httpMethod == "POST") {
      return await controller.post(event);
    } else {
      return errorResponse(methodNotAllowed());
    }
  } else {
    return errorResponse(notFound());
  }
};

export default regionRouter;
