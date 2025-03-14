import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import RegionController from "../controllers/RegionController";
import { client } from "../..";
import { errorResponse } from "../../utils/responses";
import { badRequest, methodNotAllowed, notFound } from "../../utils/error";

export const regionRouter = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const path = event.path;
  const httpMethod = event.httpMethod;
  const controller = new RegionController(client);
  if (path.startsWith("/regions/summaries") && httpMethod == "GET") {
    return await controller.getSummaries(event);
  } else if (path.startsWith("/regions/detail") && httpMethod == "GET") {
    return await controller.getDetail(event);
  } else if (path.startsWith("/regions") && httpMethod == "POST") {
    return await controller.post(event);
  } else {
    return errorResponse(notFound());
  }
};

export default regionRouter;
