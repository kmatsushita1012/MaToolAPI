import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { notFoundResponse, unauthorizedResponse } from "../../utils/responses";
import { toCamelCase } from "../../utils/formatter";

const tableName = "matool_location";

const getLocation = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  const id = event.queryStringParameters?.id;

  //ID確認
  const userSub = event.requestContext.authorizer?.claims?.sub;
  if (!userSub) {
    return unauthorizedResponse();
  }
  if (id && id !== userSub) {
    return forbiddenResponse();
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

export default getLocation;
function forbiddenResponse():
  | APIGatewayProxyResult
  | PromiseLike<APIGatewayProxyResult> {
  throw new Error("Function not implemented.");
}
