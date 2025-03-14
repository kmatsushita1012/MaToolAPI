import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { errorResponse, successResponse } from "../../utils/responses";
import { Region } from "aws-sdk/clients/budgets";
import { fromJson } from "../../utils/formatter";
import { LocationRepository } from "../repository/LocationRepository";
import LocationUsecase from "../../application/usecase/locations";
import { badRequest } from "../../utils/error";

export default class LocationController {
  private repository: LocationRepository;
  constructor(client: DynamoDBDocumentClient) {
    this.repository = new LocationRepository(client);
  }

  get = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const id = event.queryStringParameters?.id;
      const userSub = event.requestContext.authorizer?.claims?.sub;
      if (!id || !userSub) {
        throw badRequest();
      }
      const usecase = new LocationUsecase.GetUsecase(this.repository);
      const location = await usecase.execute(id, userSub);
      return successResponse(location);
    } catch (error) {
      return errorResponse(error);
    }
  };

  post = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {
      if (!event.body) {
        throw badRequest();
      }
      const data = fromJson<Region>(event.body);
      const userSub = event.requestContext.authorizer?.claims?.sub;
      if (!userSub) {
        throw badRequest();
      }
      const usecase = new LocationUsecase.GetUsecase(this.repository);
      const result = await usecase.execute(data, userSub);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };
}
