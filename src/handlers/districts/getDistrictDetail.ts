import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  badRequestResponse,
  internalServerErrorResponse,
  notFoundResponse,
} from "../../responses";

const getDistrictDetail = async (
  event: APIGatewayProxyEvent,
  ddbDocClient: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.queryStringParameters?.id;
    if (!id) {
      return badRequestResponse();
    }
    const data = await ddbDocClient.send(
      new GetCommand({
        TableName: "matool_districts",
        Key: { id },
      })
    );
    if (!data.Item) {
      return notFoundResponse();
    }
    return {
      statusCode: 200,
      body: JSON.stringify(!data.Item),
    };
  } catch (err) {
    return internalServerErrorResponse();
  }
};

export default getDistrictDetail;
