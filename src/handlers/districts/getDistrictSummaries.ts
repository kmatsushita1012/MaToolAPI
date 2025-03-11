import { internalServerErrorResponse } from "../../responses";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const getDistrictSummaries = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  const regionId = event.queryStringParameters?.region_id;
  let data;

  if (regionId) {
    data = await client.send(
      new ScanCommand({
        TableName: "matool_districts",
        IndexName: "region_id-index",
        FilterExpression: "region_id = :region_id",
        ExpressionAttributeValues: {
          ":region_id": regionId,
        },
      })
    );
  } else {
    data = await client.send(
      new ScanCommand({
        TableName: "matool_districts",
      })
    );
  }
  const items = data.Items?.map((item) => ({
    id: item.id,
    name: item.name,
  }));
  const camelData = toCamelCase(items);
  return {
    statusCode: 200,
    body: JSON.stringify(camelData),
  };
};

export default getDistrictSummaries;
