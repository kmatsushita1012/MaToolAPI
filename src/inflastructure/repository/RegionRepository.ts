import {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { toCamelCase, toSnakeCase } from "../../utils/formatter";
import { Region, RegionSummary } from "../../domain/models/regions";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import IRegionRepository from "../../domain/interface/repository/IRegionRepository";
const tableName = "matool_region";

class RegionRepositoryImpl extends IRegionRepository {
  private client: DynamoDBDocumentClient;
  constructor(client: DynamoDBDocumentClient) {
    super();
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
      throw new Error();
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
export { RegionRepositoryImpl as RegionRepository };
