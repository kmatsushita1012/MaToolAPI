import {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { toCamelCase, toSnakeCase } from "../../../utils/Formatter";
import { Region, RegionSummary } from "../../../domain/models/regions";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import IRegionRepository from "../../../domain/interface/repository/IRegionRepository";
import { internalServerError, notFound } from "../../../utils/Errors";

const tableName = "matool_regions";

export default class RegionRepositoryDynamoDB extends IRegionRepository {
  private client: DynamoDBDocumentClient;
  constructor(client: DynamoDBDocumentClient) {
    super();
    this.client = client;
  }
  get = async (id: string): Promise<Region> => {
    console.log(`repository id:${id}`);
    let data;
    try {
      data = await this.client.send(
        new GetCommand({
          TableName: tableName,
          Key: { id: id },
        })
      );
    } catch (error) {
      console.log(error);
      throw internalServerError();
    }

    if (!data.Item) {
      throw notFound();
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
      throw notFound();
    }

    const camelData = toCamelCase(data.Items);
    const regions: Region[] = camelData?.map((item) => item as Region);
    return regions;
  };

  put = async (item: Region): Promise<string> => {
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
