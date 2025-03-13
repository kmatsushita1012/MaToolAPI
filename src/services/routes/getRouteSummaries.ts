import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { toCamelCase } from "../../utils/formatter";

const tableName = "matool_routes";

const getRouteSummaries = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  const districtId = event.queryStringParameters?.districtId;

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
    districtId: item.districtId,
    date: item.date,
    title: item.title,
  }));
  const camelData = toCamelCase(items);
  return {
    statusCode: 200,
    body: JSON.stringify(camelData),
  };
};

export default getRouteSummaries;
