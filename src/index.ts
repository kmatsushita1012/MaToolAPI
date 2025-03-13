// src/app.ts

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import handleRegions from "./controllers/regionController";
import handleDistricts from "./controllers/districtController";
import handleRoutes from "./controllers/routeController";
import {
  internalServerErrorResponse,
  notFoundResponse,
} from "./utils/responses";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import handleLocations from "./controllers/locationController";

const dynamoDBClient = new DynamoDBClient({ region: "ap-northeast-1" });
const client = DynamoDBDocumentClient.from(dynamoDBClient);

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { httpMethod, path, queryStringParameters } = event;
  console.log(`PATH : ${path}`);
  console.log(`PARAM : ${queryStringParameters}`);
  try {
    if (path && path.startsWith("/regions")) {
      return await handleRegions(event, client);
    } else if (path && path.startsWith("/districts")) {
      return await handleDistricts(event, client);
    } else if (path && path.startsWith("/routes")) {
      return await handleRoutes(event, client);
    } else if (path && path.startsWith("/locations")) {
      return await handleLocations(event, client);
    } else {
      return notFoundResponse();
    }
  } catch (error) {
    console.error("ERROR:", error);
    return internalServerErrorResponse();
  }
};
