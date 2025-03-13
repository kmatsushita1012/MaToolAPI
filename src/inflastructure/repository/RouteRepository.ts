import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { RouteWithId } from "../../domain/models/route";
import { toSnakeCase } from "../../utils/formatter";
const tableName = "matool_routes";

export class RouteRepository {
  private client: DynamoDBDocumentClient;
  constructor(client: DynamoDBDocumentClient) {
    this.client = client;
  }

  putItem = async (route: RouteWithId): Promise<String> => {
    const snakeData = toSnakeCase(route);
    const marshalledData = marshall(route, { removeUndefinedValues: true });
    await this.client.send(
      new PutItemCommand({
        TableName: tableName,
        Item: marshalledData,
      })
    );
    return "Success";
  };

  delete = async (districtId: string, routeId: string): Promise<String> => {
    await this.client.send(
      new DeleteCommand({
        TableName: tableName,
        Key: {
          districtId: districtId,
          routeId: routeId,
        },
      })
    );
    return "Success";
  };
}
