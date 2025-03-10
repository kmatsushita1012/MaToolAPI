import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const deleteRoute = async (
  event: APIGatewayProxyEvent,
  ddbDocClient: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 501,
    body: JSON.stringify({ message: "Not Implemented" }),
  };
};

export default deleteRoute;