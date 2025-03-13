import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { badRequestResponse, notFoundResponse } from "../../utils/responses";
import { toCamelCase } from "../../utils/formatter";

const tableName = "matool_regions";

const getRegionDetail = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  const id = event.queryStringParameters?.id;

  if (!id) {
    return badRequestResponse();
  }
  const data = await client.send(
    new GetCommand({
      TableName: tableName,
      Key: { id },
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
};

export default getRegionDetail;
