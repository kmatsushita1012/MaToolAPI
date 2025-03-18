import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { RouteWithId } from "../../../domain/models/route";
import { toCamelCase, toSnakeCase } from "../../../utils/Formatter";
import IRouteRepository from "../../../domain/interface/repository/IRouteRepository";
import { notFound } from "../../../utils/Errors";

const tableName = "matool_routes";

export default class RouteRepositoryDynamoDB extends IRouteRepository {
  private client: DynamoDBDocumentClient;
  constructor(client: DynamoDBDocumentClient) {
    super();
    this.client = client;
  }

  query = async (districtId: string): Promise<RouteWithId[]> => {
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
      throw notFound();
    }
    const camelData = toCamelCase(data.Items);
    const routes = camelData.map((item) => item as RouteWithId);
    return routes;
  };
  get = async (districtId: string, routeId: string): Promise<RouteWithId> => {
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
      throw notFound();
    }
    const camelData = toCamelCase(data.Item);
    const route: RouteWithId = camelData as RouteWithId;
    return route;
  };

  put = async (route: RouteWithId): Promise<string> => {
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

  delete = async (districtId: string, routeId: string): Promise<string> => {
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

export { RouteRepositoryDynamoDB as RouteRepository };
