import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { errorResponse } from "../../utils/responses";
import RouteController from "../controllers/RouteController";
import { notFound } from "../../utils/error";
import { client } from "../..";

const routeRouter = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const path = event.path;
  const httpMethod = event.httpMethod;
  const controller = new RouteController(client);
  if (path.startsWith("/route/summaries") && httpMethod == "GET") {
    return await controller.getSummaries(event);
  } else if (path.startsWith("/route/detail") && httpMethod == "GET") {
    return await controller.getDetail(event);
  } else if (httpMethod == "POST") {
    return await controller.post(event);
  } else if (httpMethod == "DELETE") {
    return await controller.delete(event);
  } else {
    return errorResponse(notFound());
  }
};

export default routeRouter;
