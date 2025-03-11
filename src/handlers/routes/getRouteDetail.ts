import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  badRequestResponse,
  internalServerErrorResponse,
  notFoundResponse,
} from "../../responses";
import { toCamelCase } from "../../caseChanger";

const tableName = "matool_routes";

const getRouteDetail = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  try {
    const districtId = event.queryStringParameters?.districtId;
    const routeId = event.queryStringParameters?.routeId;
    if (!districtId || !routeId) {
      return badRequestResponse();
    }
    const data = await client.send(
      new GetCommand({
        TableName: tableName,
        Key: {
          district_id: districtId,
          route_id: routeId,
        },
      })
    );
    if (!data.Item) {
      return notFoundResponse();
    }
    const camelData = toCamelCase(data.Item);
    return {
      statusCode: 200,
      body: JSON.stringify(camelData),
    };
  } catch (err) {
    console.log(`ERROR : ${err}`);
    return internalServerErrorResponse();
  }
};

export default getRouteDetail;
