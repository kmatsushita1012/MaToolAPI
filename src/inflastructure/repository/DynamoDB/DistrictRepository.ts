import {
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { District } from "../../../domain/models/districts";
import { toCamelCase, toSnakeCase } from "../../../utils/Formatter";
import {
  ConditionalCheckFailedException,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import IDistrictRepository from "../../../domain/interfaces/repository/IDistrictRepository";
import { Errors } from "../../../utils/Errors";

const tableName = "matool_districts";

export default class DynamoDBDistrictRepository extends IDistrictRepository {
  private client: DynamoDBDocumentClient;

  constructor(client: DynamoDBDocumentClient) {
    super();
    this.client = client;
  }

  get = async (id: string): Promise<District | null> => {
    const data = await this.client.send(
      new GetCommand({
        TableName: tableName,
        Key: { id },
      })
    );
    if (!data.Item) return null;
    return toCamelCase<District>(data.Item);
  };

  queryByRegion = async (regionId: string): Promise<District[]> => {
    const result = await this.client.send(
      new QueryCommand({
        TableName: tableName,
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
    const exists = await this.get(id);
    if (!exists) throw Errors.NotFound();

    const marshalled = marshall(toSnakeCase(item), {
      removeUndefinedValues: true,
    });

    try {
      await this.client.send(
        new PutItemCommand({
          TableName: tableName,
          Item: marshalled,
          ConditionExpression: "attribute_exists(id)",
        })
      );
      return "Success";
    } catch (error) {
      if (error instanceof ConditionalCheckFailedException) {
        throw Errors.NotFound();
      }
      throw error;
    }
  };

  post = async (item: District): Promise<string> => {
    const marshalled = marshall(toSnakeCase(item), {
      removeUndefinedValues: true,
    });

    try {
      await this.client.send(
        new PutItemCommand({
          TableName: tableName,
          Item: marshalled,
          ConditionExpression: "attribute_not_exists(id)",
        })
      );
      return "Success";
    } catch (error) {
      if (error instanceof ConditionalCheckFailedException) {
        throw Errors.Conflict();
      }
      throw error;
    }
  };
}
