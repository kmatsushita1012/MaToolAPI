import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { toCamelCase, toSnakeCase } from "../../utils/formatter";
import { Location } from "../../domain/models/location";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

const tableName = "matool_location";

export default class LocationRepository {
  private client: DynamoDBDocumentClient;
  constructor(client: DynamoDBDocumentClient) {
    this.client = client;
  }
  get = async (id: string): Promise<Location> => {
    const data = await this.client.send(
      new GetCommand({
        TableName: tableName,
        Key: { id },
      })
    );
    if (!data.Item) {
      throw new Error();
    }
    const camelData = toCamelCase(data.Item);
    const item: Location = camelData;
    return item;
  };

  putItem = async (location: Location) => {
    const snakeData = toSnakeCase({ location });

    const marshalledData = marshall(snakeData, { removeUndefinedValues: true });

    await this.client.send(
      new PutItemCommand({
        TableName: tableName,
        Item: marshalledData,
      })
    );
  };
}
