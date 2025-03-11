import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  unauthorizedResponse,
  forbiddenResponse,
  internalServerErrorResponse,
} from "../../responses";

const tableName = "matool_routes";
const deleteRoute = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  const districtId = event.queryStringParameters?.districtId;
  const routeId = event.queryStringParameters?.routeId;
  //ID確認
  const userSub = event.requestContext.authorizer?.claims?.sub;
  if (!userSub) {
    return unauthorizedResponse();
  }
  if (districtId && districtId !== userSub) {
    return forbiddenResponse();
  }
  await client.send(
    new DeleteCommand({
      TableName: tableName,
      Key: {
        districtId: districtId,
        routeId: routeId,
      },
    })
  );
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Route deleted successfully" }),
  };
};

export default deleteRoute;
