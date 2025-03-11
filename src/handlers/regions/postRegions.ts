import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  badRequestResponse,
  forbiddenResponse,
  unauthorizedResponse,
} from "../../responses";

const tableName = "matool_regions";
const expectedAttributes = [
  "id",
  "name",
  "description",
  "prefecture",
  "city",
  "dates",
  "imagePath",
];

const postRegions = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  const data = JSON.parse(event.body || "{}");

  //ID確認
  const userSub = event.requestContext.authorizer?.claims?.sub;
  if (!userSub) {
    return unauthorizedResponse();
  }
  if (data.id && data.id !== userSub) {
    return forbiddenResponse();
  }
  //属性の一致を確認
  const actualAttributes = Object.keys(data).filter(
    (key) => data[key] !== undefined
  );
  if (actualAttributes.length !== expectedAttributes.length) {
    return badRequestResponse();
  }
  //変換
  const snakeData = toSnakeCase(data);
  const marshalledData = marshall(snakeData, { removeUndefinedValues: true });

  await client.send(
    new PutItemCommand({
      TableName: tableName,
      Item: marshalledData,
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "User data saved successfully" }),
  };
};

export default postRegions;
