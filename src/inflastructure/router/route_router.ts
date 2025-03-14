import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { methodNotAllowedResponse } from "../../utils/responses";
import RouteController from "../controllers/RouteController";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
const dynamoDBClient = new DynamoDBClient({ region: "ap-northeast-1" });
const client = DynamoDBDocumentClient.from(dynamoDBClient);
const controller = new RouteController(client);

const routeRouter = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const path = event.path;
  const httpMethod = event.httpMethod;

  if (path.startsWith("/route/summaries") && httpMethod == "GET") {
    return await controller.getSummaries(event);
  } else if (path.startsWith("/route/detail") && httpMethod == "GET") {
    return await controller.getDetail(event);
  } else if (httpMethod == "POST") {
    return await controller.post(event);
  } else if (httpMethod == "DELETE") {
    return await controller.delete(event);
  } else {
    return methodNotAllowedResponse();
  }
};

export default routeRouter;
