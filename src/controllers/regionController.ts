import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { badRequestResponse, notImplemented } from "../utils/responses";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { fromJson } from "../utils/formatter";
import { Region } from "../domain/models/regions";
import RegionRepository from "../inflastructure/repository/RegionRepository";

export default class RegionController {
  private repository: RegionRepository;
  constructor(client: DynamoDBDocumentClient) {
    this.repository = new RegionRepository(client);
  }

  getDetail = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    const id = event.queryStringParameters?.id;
    if (!id) {
      return badRequestResponse();
    }
    return notImplemented();
  };
  getSummaries = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
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
