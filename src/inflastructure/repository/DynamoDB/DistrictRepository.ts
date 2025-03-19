import {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { District } from "../../../domain/models/districts";
import { toCamelCase, toSnakeCase } from "../../../utils/Formatter";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import IDistrictRepository from "../../../domain/interface/repository/IDistrictRepository";
import { notFound } from "../../../utils/Errors";

const tableName = "matool_districts";

export default class DistrictRepositoryDynamoDB extends IDistrictRepository {
  private client: DynamoDBDocumentClient;
  constructor(client: DynamoDBDocumentClient) {
    super();
    this.client = client;
  }

  get = async (id: string): Promise<District> => {
    const data = await this.client.send(
      new GetCommand({
        TableName: tableName,
        Key: { id: id },
      })
    );
    if (!data.Item) {
      throw notFound();
    }
    const camelData = toCamelCase(data.Item);
    const district: District = camelData as District;
    return district;
  };

  scan = async (regionId: string): Promise<District[]> => {
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

    if (!data.Items) {
      throw notFound();
    }
    const camelData = toCamelCase(data.Items);
    const districts: District[] = camelData.map((item) => item as District);
    return districts;
  };

  put = async (item: District): Promise<string> => {
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
