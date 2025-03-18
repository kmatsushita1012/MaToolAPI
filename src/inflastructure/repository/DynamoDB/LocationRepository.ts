import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { toCamelCase, toSnakeCase } from "../../../utils/Formatter";
import { Location, LocationWithET } from "../../../domain/models/location";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import ILocationRepository from "../../../domain/interface/repository/ILocationRepository";
import { notFound } from "../../../utils/Errors";

const tableName = "matool_locations";

export default class LocationRepositoryDynamoDB extends ILocationRepository {
  private client: DynamoDBDocumentClient;
  constructor(client: DynamoDBDocumentClient) {
    super();
    this.client = client;
  }
  get = async (id: string): Promise<Location> => {
    const data = await this.client.send(
      new GetCommand({
        TableName: tableName,
        Key: { id },
      })
    );
    if (!data.Item) {
      throw notFound();
    }
    const camelData = toCamelCase(data.Item);
    const location: Location = camelData as Location;
    return location;
  };

  put = async (location: LocationWithET): Promise<string> => {
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
}

export { LocationRepositoryDynamoDB as LocationRepository };
