import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { badRequestResponse, notImplemented } from "../utils/responses";
import { Region } from "aws-sdk/clients/budgets";
import { fromJson } from "../utils/formatter";
import LocationRepository from "../inflastructure/repository/LocationRepository";

export default class LocationController {
  private repository: LocationRepository;
  constructor(client: DynamoDBDocumentClient) {
    this.repository = new LocationRepository(client);
  }

  get = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.queryStringParameters?.id;
    const userSub = event.requestContext.authorizer?.claims?.sub;
    return notImplemented();
  };

  post = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    if (!event.body) {
      return badRequestResponse();
    }
    const data = fromJson<Region>(event.body);
    const userSub = event.requestContext.authorizer?.claims?.sub;
    return notImplemented();
  };
}
