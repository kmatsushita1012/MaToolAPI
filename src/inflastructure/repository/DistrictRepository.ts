import {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { District, DistrictSummary } from "../../domain/models/districts";
import { toCamelCase, toSnakeCase } from "../../utils/formatter";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

const tableName = "matool_district";

export default class DistrictRepository {
  private client: DynamoDBDocumentClient;
  constructor(client: DynamoDBDocumentClient) {
    this.client = client;
  }

  get = async (id: string): Promise<District> => {
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

  scan = async (regionId: String): Promise<DistrictSummary[]> => {
    let data;

    if (regionId) {
      data = await this.client.send(
        new ScanCommand({
          TableName: tableName,
          IndexName: "region_id-index",
          FilterExpression: "region_id = :region_id",
          ExpressionAttributeValues: {
            ":region_id": regionId,
          },
        })
      );
    } else {
      data = await this.client.send(
        new ScanCommand({
          TableName: "matool_districts",
        })
      );
    }

    const camelData = toCamelCase(data.Items);
    const items = camelData.map((item) => ({
      id: item.id,
      name: item.name,
    }));
    return camelData;
  };

  putItem = async (item: District): Promise<string> => {
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
