import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import getRoute from "./routes/getRoute";
import postRoute from "./routes/postRoute";
import deleteRoute from "./routes/deleteRoute";

const handleRegions = async (
  event: APIGatewayProxyEvent,
  ddbDocClient: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  const path = event.path;
  const httpMethod = event.httpMethod;

  if (httpMethod == "GET") {
    return await getRoute(event, ddbDocClient);
  } else if (httpMethod == "POST") {
    return await postRoute(event, ddbDocClient);
  } else if (httpMethod == "DELETE") {
    return await deleteRoute(event, ddbDocClient);
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }
};

export default handleRegions;
