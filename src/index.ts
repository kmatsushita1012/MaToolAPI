// src/app.ts

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import rootRouter from "./inflastructure/router/root_router";
import { errorResponse } from "./utils/responses";
import { internalServerError } from "./utils/error";
import Controllers from "./inflastructure/controllers";

const dynamoDBClient = new DynamoDBClient({ region: "ap-northeast-1" });
const client = DynamoDBDocumentClient.from(dynamoDBClient);
export const controllers = new Controllers(client);

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { httpMethod, path, queryStringParameters } = event;
  console.log(`METHOD : ${httpMethod}`);
  console.log(`PATH : ${path}`);
  console.log(`PARAM : ${String(queryStringParameters)}`);
  console.log(`CLIENT : ${client}`);
  try {
    return await rootRouter(event);
  } catch (error) {
    console.error("ERROR:", error);
    return errorResponse(internalServerError());
  }
};
