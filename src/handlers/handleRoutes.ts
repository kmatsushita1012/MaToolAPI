import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import getRouteDetail from "./routes/getRouteDetail";
import postRoute from "./routes/postRoute";
import deleteRoute from "./routes/deleteRoute";

const handleRegions = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  const path = event.path;
  const httpMethod = event.httpMethod;

  if (httpMethod == "GET") {
    return await getRouteDetail(event, client);
  } else if (httpMethod == "POST") {
    return await postRoute(event, client);
  } else if (httpMethod == "DELETE") {
    return await deleteRoute(event, client);
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }
};

export default handleRegions;
