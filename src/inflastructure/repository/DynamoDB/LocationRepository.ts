import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";
import { toCamelCase, toSnakeCase } from "../../../utils/Formatter";
import { Location, ExpirableLocation } from "../../../domain/models/locations";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import ILocationRepository from "../../../domain/interface/repository/ILocationRepository";

const tableName = "matool_locations";

export default class DynamoDBLocationRepository extends ILocationRepository {
  private client: DynamoDBDocumentClient;
  constructor(client: DynamoDBDocumentClient) {
    super();
    this.client = client;
  }

  get = async (id: string): Promise<Location | null> => {
    const data = await this.client.send(
      new GetCommand({
        TableName: tableName,
        Key: { id },
      })
    );
    if (!data.Item) {
      return null;
    }
    const location = toCamelCase<Location>(data.Item);
    return location;
  };

  put = async (location: ExpirableLocation): Promise<string> => {
    const snakeData = toSnakeCase({ location });
    const marshalledData = marshall(snakeData, { removeUndefinedValues: true });
    await this.client.send(
      new PutItemCommand({
        TableName: tableName,
        Item: marshalledData,
      })
    );
    return "Success";
  };

  delete = async (districtId: string): Promise<string> => {
    await this.client.send(
      new DeleteCommand({
        TableName: tableName,
        Key: {
          districtId: districtId,
        },
      })
    );
    return "Success";
  };
}
