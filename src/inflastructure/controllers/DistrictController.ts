import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { errorResponse, successResponse } from "../../utils/responses";
import { fromJson } from "../../utils/formatter";
import { District } from "../../domain/models/districts";
import { DistrictRepository } from "../repository/DistrictRepository";
import IDistrictRepository from "../../domain/interface/repository/IDistrictRepository";
import DistrictUsecase from "../../application/usecase/districts";
import { badRequest } from "../../utils/error";

export default class DistrictController {
  private repository: IDistrictRepository;
  constructor(client: DynamoDBDocumentClient) {
    this.repository = new DistrictRepository(client);
  }

  getDetail = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {
      const id = event.queryStringParameters?.id;
      if (!id) {
        throw badRequest();
      }
      const usecase = new DistrictUsecase.GetDetailUsecase(this.repository);
      const result = await usecase.execute(id);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };

  getSummaries = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {
      const regionId = event.queryStringParameters?.regionId;
      if (!regionId) {
        throw badRequest();
      }
      const usecase = new DistrictUsecase.GetSummariesUsecase(this.repository);
      const result = await usecase.execute(regionId);
      return successResponse(result);
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
      const data = fromJson<District>(event.body);
      const userSub: string = event.requestContext.authorizer?.claims?.sub;
      if (!userSub) {
        throw badRequest();
      }
      const usecase = new DistrictUsecase.PostUsecase(this.repository);
      const result = await usecase.execute(data, userSub);
      return successResponse(result);
    } catch (error) {
      throw errorResponse(error);
    }
  };
}
