import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import {
  badRequestResponse,
  notImplemented,
  successResponse,
} from "../../utils/responses";
import { RouteRepository } from "../repository/RouteRepository";
import { SimpleDate } from "../../domain/models/share";
import RouteUsecase from "../../application/usecase/routes";
import { Route } from "../../domain/models/route";
import IRouteRepository from "../../domain/interface/repository/IRouteRepository";
import ILocationRepository from "../../domain/interface/repository/ILocationRepository";
import { LocationRepository } from "../repository/LocationRepository";

export default class RouteController {
  // private serializer: RouteSerializer;
  private routeRepository: IRouteRepository;
  private locationRepository: ILocationRepository;
  constructor(client: DynamoDBDocumentClient) {
    this.routeRepository = new RouteRepository(client);
    this.locationRepository = new LocationRepository(client);
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
    const title = event.queryStringParameters?.title
      ? event.queryStringParameters?.title
      : null;
    let date;
    if (year && month && day) {
      date = new SimpleDate(year, month, day);
    } else {
      date = null;
    }

    const usecase = new RouteUsecase.GetDetailUsecase(
      this.routeRepository,
      this.locationRepository
    );
    const result = await usecase.execute(districtId, date, title);
    return successResponse(result);
  };

  post = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    const data: Route = JSON.parse(event.body || "{}");
    const userSub = event.requestContext.authorizer?.claims?.sub;
    if (!data || !userSub) {
      return badRequestResponse();
    }
    const usecase = new RouteUsecase.PostUsecase(this.routeRepository);
    const result = await usecase.execute(data, userSub);
    return successResponse(result);
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
    const usecase = new RouteUsecase.DeleteUsecase(this.routeRepository);
    const result = await usecase.execute(districtId, date, title, userSub);
    return successResponse(result);
  };
}
