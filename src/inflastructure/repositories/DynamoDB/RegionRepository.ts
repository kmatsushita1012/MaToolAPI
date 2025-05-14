import {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { toCamelCase, toSnakeCase } from "../formatter";
import { Region } from "../../../domain/entities/regions";
import { marshall } from "@aws-sdk/util-dynamodb";
import IRegionRepository from "../../../domain/interfaces/repository/IRegionRepository";
import { Errors } from "../../../utils/Errors";

export default class DynamoDBRegionRepository extends IRegionRepository {
  constructor(
    private client: DynamoDBDocumentClient,
    private tableName: string
  ) {
    super();
  }
  get = async (id: string): Promise<Region | null> => {
    try {
      const data = await this.client.send(
        new GetCommand({
          TableName: this.tableName,
          Key: { id: id },
        })
      );
      if (!data.Item) {
        return null;
      }
      const camelData = toCamelCase(data.Item);
      const region: Region = camelData as Region;
      return region;
    } catch (error) {
      console.log(error);
      throw Errors.InternalServerError(error as string);
    }
  };

  scan = async (): Promise<Region[]> => {
    try {
      const data = await this.client.send(
        new ScanCommand({
          TableName: this.tableName,
        })
      );
      if (!data.Items || data.Items.length === 0) {
        return [];
      }
      const regions = toCamelCase<[Region]>(data.Items);
      return regions;
    } catch (error) {
      console.log(error);
      throw Errors.InternalServerError(error as string);
    }
  };

  put = async (item: Region): Promise<string> => {
    try {
      const snakedItem = toSnakeCase(item);
      await this.client.send(
        new PutCommand({
          TableName: this.tableName,
          Item: snakedItem,
        })
      );
      return "Success";
    } catch (error) {
      console.log(error);
      throw Errors.InternalServerError(error as string);
    }
  };
}
