// src/app.ts

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import handleRegions from "./handlers/handleRegions";
import handleDistricts from "./handlers/handleDistricts";
import handleRoutes from "./handlers/handleRoutes";
import { internalServerErrorResponse, notFoundResponse } from "./responses";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "ap-northeast-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { httpMethod, path } = event;
  console.log(`PATH:${path}`);
  try {
    if (path && path.startsWith("/regions")) {
      return await handleRegions(event, ddbDocClient);
    } else if (path && path.startsWith("/districts")) {
      return await handleDistricts(event, ddbDocClient);
    } else if (path && path.startsWith("/routes")) {
      return await handleRoutes(event, ddbDocClient);
    } else {
      return notFoundResponse();
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return internalServerErrorResponse();
  }
};
