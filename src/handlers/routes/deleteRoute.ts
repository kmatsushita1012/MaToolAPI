import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  unauthorizedResponse,
  forbiddenResponse,
  badRequestResponse,
} from "../../utils/responses";
import { makeRouteId } from "../../utils/routeUtils";

const tableName = "matool_routes";

const deleteRoute = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  const districtId = event.queryStringParameters?.districtId;
  const year = event.queryStringParameters?.year;
  const month = event.queryStringParameters?.month;
  const day = event.queryStringParameters?.day;
  const title = event.queryStringParameters?.title;
  if (!districtId || !year || !month || !day || !title) {
    return badRequestResponse();
  }

  //ID確認
  const userSub = event.requestContext.authorizer?.claims?.sub;
  if (!userSub) {
    return unauthorizedResponse();
  }
  if (districtId !== userSub) {
    return forbiddenResponse();
  }
  const date = {
    year: Number(event.queryStringParameters?.year) || new Date().getFullYear(),
    month:
      Number(event.queryStringParameters?.month) || new Date().getMonth() + 1,
    day: Number(event.queryStringParameters?.day) || new Date().getDate(),
  };
  const routeId = makeRouteId(date, title);
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
