import {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { toCamelCase, toSnakeCase } from "../../utils/formatter";
import { Region, RegionSummary } from "../../domain/models/regions";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
const tableName = "matool_region";

export default class RegionRepository {
  private client: DynamoDBDocumentClient;
  constructor(client: DynamoDBDocumentClient) {
    this.client = client;
  }
  get = async (id: string): Promise<Region> => {
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
    return camelData;
  };

  scan = async (): Promise<RegionSummary[]> => {
    const data = await this.client.send(
      new ScanCommand({
        TableName: tableName,
      })
    );
    const items = data.Items?.map((item) => ({
      id: item.id,
      name: item.name,
    }));

    const camelData = toCamelCase(items);
    return camelData;
  };

  putItem = async (item: Region): Promise<string> => {
    //変換
    const snakeData = toSnakeCase(item);
    const marshalledData = marshall(snakeData, { removeUndefinedValues: true });

    await this.client.send(
      new PutItemCommand({
        TableName: tableName,
        Item: marshalledData,
      })
    );

    return "Success";
  };
}
