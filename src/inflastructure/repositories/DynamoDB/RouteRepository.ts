import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandOutput,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { toCamelCase, toSnakeCase } from "../formatter";
import IRouteRepository from "../../../domain/interface/repository/IRouteRepository";
import { Errors } from "../../../utils/Errors";
import { Route } from "../../../domain/entities/routes";

export default class DynamoDBRouteRepository extends IRouteRepository {
  constructor(
    private client: DynamoDBDocumentClient,
    private tableName: string
  ) {
    super();
  }

  query = async (districtId: string): Promise<Route[]> => {
    try {
      const data = await this.client.send(
        new QueryCommand({
          TableName: this.tableName,
          IndexName: "district_id-index",
          KeyConditionExpression: "district_id = :districtId",
          ExpressionAttributeValues: {
            ":districtId": districtId,
          },
        })
      );
      if (!data.Items || data.Items.length === 0) {
        return [];
      }
      const routes = toCamelCase<Route[]>(data.Items);
      return routes;
    } catch (error) {
      console.log(error);
      throw Errors.InternalServerError(error as string);
    }
  };

  get = async (id: string): Promise<Route | null> => {
    let data: GetCommandOutput;
    try {
      data = await this.client.send(
        new GetCommand({
          TableName: this.tableName,
          Key: {
            id: id,
          },
        })
      );
    } catch (error) {
      console.log(error);
      throw Errors.InternalServerError(error as string);
    }
    if (!data.Item) {
      return null;
    }
    const route = toCamelCase<Route>(data.Item);
    return route;
  };

  post = async (route: Route): Promise<string> => {
    const snakedItem = toSnakeCase(route);
    console.log(JSON.stringify(snakedItem));
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

  put = async (route: Route): Promise<string> => {
    const snakedItem = toSnakeCase(route);
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

  delete = async (id: string): Promise<string> => {
    try {
      await this.client.send(
        new DeleteCommand({
          TableName: this.tableName,
          Key: {
            id: id,
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
