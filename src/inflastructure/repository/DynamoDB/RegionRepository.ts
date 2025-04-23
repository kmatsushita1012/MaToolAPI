import {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { toCamelCase, toSnakeCase } from "../../../utils/Formatter";
import { Region } from "../../../domain/models/regions";
import { marshall } from "@aws-sdk/util-dynamodb";
import IRegionRepository from "../../../domain/interfaces/repository/IRegionRepository";
import { Errors } from "../../../utils/Errors";

const tableName = "matool_regions";

export default class DynamoDBRegionRepository extends IRegionRepository {
  private client: DynamoDBDocumentClient;
  constructor(client: DynamoDBDocumentClient) {
    super();
    this.client = client;
  }
  get = async (id: string): Promise<Region | null> => {
    const data = await this.client.send(
      new GetCommand({
        TableName: tableName,
        Key: { id: id },
      })
    );
    if (!data.Item) {
      return null;
    }
    const camelData = toCamelCase(data.Item);
    const region: Region = camelData as Region;
    return region;
  };

  scan = async (): Promise<Region[]> => {
    const data = await this.client.send(
      new ScanCommand({
        TableName: tableName,
      })
    );
    if (!data.Items) {
      throw Errors.NotFound();
    }
    const regions = toCamelCase<[Region]>(data.Items);
    return regions;
  };

  put = async (item: Region): Promise<string> => {
    const snakeData = toSnakeCase(item);
    const marshalledData = marshall(snakeData, { removeUndefinedValues: true });
    await this.client.send(
      new PutCommand({
        TableName: tableName,
        Item: marshalledData,
      })
    );
    return "Success";
  };
}
