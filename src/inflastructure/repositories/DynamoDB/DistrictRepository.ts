import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { District } from "../../../domain/entities/districts";
import { toCamelCase, toSnakeCase } from "../formatter";
import IDistrictRepository from "../../../domain/interfaces/repository/IDistrictRepository";

class DynamoDBDistrictRepository extends IDistrictRepository {
  constructor(
    private client: DynamoDBDocumentClient,
    private tableName: string
  ) {
    super();
  }

  get = async (id: string): Promise<District | null> => {
    const data = await this.client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { id },
      })
    );
    if (!data.Item) return null;
    return toCamelCase<District>(data.Item);
  };

  queryByRegion = async (regionId: string): Promise<District[]> => {
    const result = await this.client.send(
      new QueryCommand({
        TableName: this.tableName,
        IndexName: "region_id-index",
        KeyConditionExpression: "region_id = :regionId",
        ExpressionAttributeValues: {
          ":regionId": regionId,
        },
      })
    );

    const items = result.Items ?? [];
    return toCamelCase(items) as District[];
  };

  put = async (id: string, item: District): Promise<string> => {
    const snakedItem = toSnakeCase(item);
    try {
      await this.client.send(
        new PutCommand({
          TableName: this.tableName,
          Item: snakedItem,
        })
      );
      return "Success";
    } catch (error) {
      throw error;
    }
  };

  post = async (item: District): Promise<string> => {
    const snakedItem = toSnakeCase(item);
    try {
      await this.client.send(
        new PutCommand({
          TableName: this.tableName,
          Item: snakedItem,
        })
      );
      return "Success";
    } catch (error) {
      throw error;
    }
  };
}

export default DynamoDBDistrictRepository;
