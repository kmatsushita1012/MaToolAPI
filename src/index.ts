// src/app.ts

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import rootRouter from "./inflastructure/router/root_router";
import { errorResponse } from "./utils/responses";
import { internalServerError } from "./utils/error";

const dynamoDBClient = new DynamoDBClient({ region: "ap-northeast-1" });
export const client = DynamoDBDocumentClient.from(dynamoDBClient);

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { httpMethod, path, queryStringParameters } = event;
  console.log(`METHOD : ${httpMethod}`);
  console.log(`PATH : ${path}`);
  console.log(`PARAM : ${queryStringParameters}`);
  try {
    return await rootRouter(event);
  } catch (error) {
    console.error("ERROR:", error);
    return errorResponse(internalServerError());
  }
};
