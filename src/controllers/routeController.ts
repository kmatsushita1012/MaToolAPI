import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import {
  badRequestResponse,
  notImplemented,
} from "../utils/responses";
import { RouteRepository } from "../inflastructure/repository/RouteRepository";
import { SimpleDate } from "../domain/models/share";

export default class RouteController {
  // private serializer: RouteSerializer;
  private repository: RouteRepository;
  constructor(client: DynamoDBDocumentClient) {
    this.repository = new RouteRepository(client);
  }
  getSummaries = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    const districtId = event.queryStringParameters?.districtId;
    if (!districtId) {
      return badRequestResponse();
    }
    return notImplemented();
  };

  getDetail = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    const districtId = event.queryStringParameters?.districtId;
    if (!districtId) {
      return badRequestResponse();
    }
    const year = event.queryStringParameters?.year;
    const month = event.queryStringParameters?.month;
    const day = event.queryStringParameters?.day;
    const title = event.queryStringParameters?.title;
    let date;
    if (year && month && day) {
      date = new SimpleDate(year, month, day);
    } else {
      date = null;
    }

    return notImplemented();
  };

  post = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    const data: { [key: string]: any } = JSON.parse(event.body || "{}");
    //ID確認
    const userSub = event.requestContext.authorizer?.claims?.sub;
    // const result = new postRoute(data, userSub);
    return notImplemented();
  };

  delete = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    const districtId = event.queryStringParameters?.districtId;
    const year = event.queryStringParameters?.year;
    const month = event.queryStringParameters?.month;
    const day = event.queryStringParameters?.day;
    const title = event.queryStringParameters?.title;
    if (!districtId || !year || !month || !day || !title) {
      return badRequestResponse();
    }
    //ID確認
    const userSub = event.requestContext.authorizer?.claims?.sub;
    const date = {
      year:
        Number(event.queryStringParameters?.year) || new Date().getFullYear(),
      month:
        Number(event.queryStringParameters?.month) || new Date().getMonth() + 1,
      day: Number(event.queryStringParameters?.day) || new Date().getDate(),
    };
    return notImplemented();
  };
}
