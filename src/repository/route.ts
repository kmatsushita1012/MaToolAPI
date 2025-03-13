import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { RouteWithId } from "../domain/models/route";
import { toSnakeCase } from "../utils/formatter";
import { marshall } from "@aws-sdk/util-dynamodb";
const tableName = "matool_routes";

export const putRoute = async (route: RouteWithId) => {
  const snakeData = toSnakeCase(route);
  const marshalledData = marshall(route, { removeUndefinedValues: true });
  await client.send(
    new PutItemCommand({
      TableName: tableName,
      Item: marshalledData,
    })
  );
};
