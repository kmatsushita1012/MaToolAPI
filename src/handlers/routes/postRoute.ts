import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  badRequestResponse,
  forbiddenResponse,
  unauthorizedResponse,
} from "../../responses";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { toSnakeCase } from "../../caseChanger";

const tableName = "matool_routes";
const expectedAttributes = [
  "id",
  "district_id",
  "date",
  "title",
  "description",
  "points",
  "segments",
  "current",
  "start",
  "goal",
];

const postRoute = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  const data: { [key: string]: any } = JSON.parse(event.body || "{}");
  //属性の一致を確認
  const actualAttributes = Object.keys(data).filter(
    (key) => data[key] !== undefined
  );
  if (actualAttributes.length !== expectedAttributes.length) {
    return badRequestResponse();
  }
  const id = data.id;

  //ID確認
  const userSub = event.requestContext.authorizer?.claims?.sub;
  if (!userSub) {
    return unauthorizedResponse();
  }
  if (data.districtId && data.districtId !== userSub) {
    return forbiddenResponse();
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

export default postRoute;
