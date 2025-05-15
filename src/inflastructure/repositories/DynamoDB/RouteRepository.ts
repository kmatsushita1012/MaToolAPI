import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandOutput,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { toCamelCase, toSnakeCase } from "../formatter";
import IRouteRepository from "../../../domain/interfaces/repository/IRouteRepository";
import { Errors } from "../../../utils/Errors";
import {
  makeRouteId,
  Route,
  toStorableRoute,
} from "../../../domain/entities/routes";
import { SimpleDate } from "../../../domain/entities/shared";

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
          KeyConditionExpression: "district_id = :district_id",
          ExpressionAttributeValues: {
            ":district_id": districtId,
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

  get = async (
    districtId: string,
    date: SimpleDate,
    title: string
  ): Promise<Route | null> => {
    const routeId = makeRouteId(date, title);
    let data: GetCommandOutput;
    try {
      data = await this.client.send(
        new GetCommand({
          TableName: this.tableName,
          Key: {
            district_id: districtId,
            route_id: routeId,
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
    const item = toCamelCase(data.Item);
    const route = item as Route;
    return route;
  };

  post = async (route: Route): Promise<string> => {
    const storableRoute = toStorableRoute(route);
    const snakedItem = toSnakeCase(storableRoute);
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
    const storableRoute = toStorableRoute(route);
    const snakedItem = toSnakeCase(storableRoute);
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

  delete = async (
    districtId: string,
    date: SimpleDate,
    title: string
  ): Promise<string> => {
    const routeId = makeRouteId(date, title);
    try {
      await this.client.send(
        new DeleteCommand({
          TableName: this.tableName,
          Key: {
            district_id: districtId,
            routeId: routeId,
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
