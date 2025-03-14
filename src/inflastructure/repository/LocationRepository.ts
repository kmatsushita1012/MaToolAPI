import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { toCamelCase, toSnakeCase } from "../../utils/formatter";
import { Location, LocationWithET } from "../../domain/models/location";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import ILocationRepository from "../../domain/interface/repository/ILocationRepository";
import { notFound } from "../../utils/error";

const tableName = "matool_location";

class LocationRepositoryImpl extends ILocationRepository {
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

export { LocationRepositoryImpl as LocationRepository };
