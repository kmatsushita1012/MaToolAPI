import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import getRouteDetail from "../handlers/routes/getRouteDetail";
import postRoute from "../services/routes/PostRouteUsecase";
import deleteRoute from "../handlers/routes/deleteRoute";
import getRouteSummaries from "../handlers/routes/getRouteSummaries";
import { successResponse } from "../utils/responses";

const handleRoutes = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  const path = event.path;
  const httpMethod = event.httpMethod;

  if (path.startsWith("/route/summaries") && httpMethod == "GET") {
    return await getRouteSummaries(event, client);
  } else if (path.startsWith("/route/detail") && httpMethod == "GET") {
    return await getRouteDetail(event, client);
  } else if (httpMethod == "POST") {
    return await handlePostRoute(event, client);
  } else if (httpMethod == "DELETE") {
    return await deleteRoute(event, client);
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }
};

export default handleRoutes;

const handlePostRoute = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  const data: { [key: string]: any } = JSON.parse(event.body || "{}");
  //ID確認
  const userSub = event.requestContext.authorizer?.claims?.sub;
  const result = postRoute(data, userSub);
  return successResponse(result);
};
