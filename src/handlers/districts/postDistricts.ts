import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  badRequestResponse,
  forbiddenResponse,
  unauthorizedResponse,
} from "../../utils/responses";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { toSnakeCase } from "../../utils/formatter";

const tableName = "matool_districts";
const expectedAttributes = [
  "id",
  "name",
  "region_id",
  "description",
  "base",
  "area",
  "imagePath",
];

const postDistricts = async (
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
  //変換
  const snakeData = toSnakeCase(data);
  //属性の一致を確認
  const actualAttributes = Object.keys(snakeData).filter(
    (key) => data[key] !== undefined
  );
  if (actualAttributes.length !== expectedAttributes.length) {
    return badRequestResponse();
  }
  //変換
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

export default postDistricts;
