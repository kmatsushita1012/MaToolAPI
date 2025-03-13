import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { notFoundResponse, unauthorizedResponse } from "../../utils/responses";
import { toCamelCase } from "../../utils/formatter";



const getLocation = async (

): Promise<Location> => {
  if (!userSub) {
    return unauthorizedResponse();
  }
  if (id && id !== userSub) {
    return forbiddenResponse();
  }

  
  return {
    statusCode: 200,
    body: JSON.stringify(camelData),
  };
};

export default getLocation;
