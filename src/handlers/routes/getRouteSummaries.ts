import { internalServerErrorResponse } from "../../responses";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const tableName = "matool_routes";

const getDistrictSummaries = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  const districtId = event.queryStringParameters?.district_id;

  if (!districtId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Bad Request: Missing district_id" }),
    };
  }

  const data = await client.send(
    new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: "district_id = :district_id",
      ExpressionAttributeValues: {
        ":district_id": districtId,
      },
    })
  );
  const items = data.Items?.map((item) => ({
    id: item.id,
    title: item.title,
  }));
  const camelData = toCamelCase(items);
  return {
    statusCode: 200,
    body: JSON.stringify(camelData),
  };
};

export default getDistrictSummaries;
