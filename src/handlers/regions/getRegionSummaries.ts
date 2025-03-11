import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { internalServerErrorResponse } from "../../responses";

const tableName = "matool_region";

const getRegionSummaries = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  const data = await client.send(
    new ScanCommand({
      TableName: tableName,
    })
  );
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

export default getRegionSummaries;
