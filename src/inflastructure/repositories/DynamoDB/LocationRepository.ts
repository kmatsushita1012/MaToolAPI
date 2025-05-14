import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { toCamelCase, toSnakeCase } from "../formatter";
import {
  Location,
  ExpirableLocation,
} from "../../../domain/entities/locations";
import ILocationRepository from "../../../domain/interfaces/repository/ILocationRepository";
import { Errors } from "../../../utils/Errors";

class DynamoDBLocationRepository extends ILocationRepository {
  constructor(
    private client: DynamoDBDocumentClient,
    private tableName: string
  ) {
    super();
  }

  get = async (id: string): Promise<Location | null> => {
    try {
      const data = await this.client.send(
        new GetCommand({
          TableName: this.tableName,
          Key: { id },
        })
      );
      if (!data.Item) {
        return null;
      }
      const location = toCamelCase<Location>(data.Item);
      return location;
    } catch (error) {
      console.log(error);
      throw Errors.InternalServerError(error as string);
    }
  };

  put = async (location: ExpirableLocation): Promise<string> => {
    const snakedItem = toSnakeCase(location);
    try {
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

  delete = async (districtId: string): Promise<string> => {
    try {
      await this.client.send(
        new DeleteCommand({
          TableName: this.tableName,
          Key: {
            districtId: districtId,
          },
        })
      );
      return "Success";
    } catch (error) {
      console.log(error);
      throw Errors.InternalServerError(error as string);
    }
  };
}

export default DynamoDBLocationRepository;
