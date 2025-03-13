import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { forbiddenResponse, unauthorizedResponse } from "../../utils/responses";
import { Region } from "../../domain/models/regions";

const postRegions = async (
  region: Region,
  userSub: string
): Promise<APIGatewayProxyResult> => {
  
  if (!userSub) {
    return unauthorizedResponse();
  }
  if (region.id !== userSub) {
    return forbiddenResponse();
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "User data saved successfully" }),
  };
};

export default postRegions;
