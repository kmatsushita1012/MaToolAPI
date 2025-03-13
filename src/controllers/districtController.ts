import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { badRequestResponse, notImplemented } from "../utils/responses";
import { fromJson } from "../utils/formatter";
import { District } from "../domain/models/districts";
import DistrictRepository from "../inflastructure/repository/DistrictRepository";

export default class DistrictController {
  private repository: DistrictRepository;
  constructor(client: DynamoDBDocumentClient) {
    this.repository = new DistrictRepository(client);
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
    const regionId = event.queryStringParameters?.regionId;
    return notImplemented();
  };
  post = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    if (!event.body) {
      return badRequestResponse();
    }
    const data = fromJson<District>(event.body);
    const userSub = event.requestContext.authorizer?.claims?.sub;
    return notImplemented();
  };
}
