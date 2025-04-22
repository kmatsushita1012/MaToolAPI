import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { toCamelCase, toSnakeCase } from "../../../utils/Formatter";
import IRouteRepository from "../../../domain/interface/repository/IRouteRepository";
import { Errors } from "../../../utils/Errors";
import {
  makeRouteId,
  Route,
  toStorableRoute,
} from "../../../domain/models/routes";
import { SimpleDate } from "../../../domain/models/shared";

const tableName = "matool_routes";

export default class DynamoDBRouteRepository extends IRouteRepository {
  private client: DynamoDBDocumentClient;
  constructor(client: DynamoDBDocumentClient) {
    super();
    this.client = client;
  }

  query = async (districtId: string): Promise<Route[]> => {
    const data = await this.client.send(
      new QueryCommand({
        TableName: tableName,
        KeyConditionExpression: "district_id = :district_id",
        ExpressionAttributeValues: {
          ":district_id": districtId,
        },
      })
    );
    if (!data.Items) {
      throw Errors.NotFound();
    }
    const routes = toCamelCase<Route[]>(data.Items);
    return routes;
  };

  get = async (
    districtId: string,
    date: SimpleDate,
    title: string
  ): Promise<Route | null> => {
    const routeId = makeRouteId(date, title);
    const data = await this.client.send(
      new GetCommand({
        TableName: tableName,
        Key: {
          district_id: districtId,
          route_id: routeId,
        },
      })
    );
    if (!data.Item) {
      return null;
    }
    const item = toCamelCase(data.Item);
    const route = item as Route;
    return route;
  };

  post = async (route: Route): Promise<string> => {
    const storableRoute = toStorableRoute(route);
    const snakeData = toSnakeCase(route);
    const marshalledData = marshall(route, { removeUndefinedValues: true });
    await this.client.send(
      new PutItemCommand({
        TableName: tableName,
        Item: marshalledData,
      })
    );
    return "Success";
  };

  put = async (route: Route): Promise<string> => {
    const storableRoute = toStorableRoute(route);
    const snakeData = toSnakeCase(route);
    const marshalledData = marshall(route, { removeUndefinedValues: true });
    await this.client.send(
      new PutItemCommand({
        TableName: tableName,
        Item: marshalledData,
      })
    );
    return "Success";
  };

  delete = async (
    districtId: string,
    date: SimpleDate,
    title: string
  ): Promise<string> => {
    const routeId = makeRouteId(date, title);
    await this.client.send(
      new DeleteCommand({
        TableName: tableName,
        Key: {
          districtId: districtId,
          routeId: routeId,
        },
      })
    );
    return "Success";
  };
}
