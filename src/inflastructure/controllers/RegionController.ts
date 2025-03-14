import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { errorResponse, successResponse } from "../../utils/responses";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { fromJson } from "../../utils/formatter";
import { Region } from "../../domain/models/regions";
import { RegionRepository } from "../repository/RegionRepository";
import RegionUsecase from "../../application/usecase/regions";
import { badRequest } from "../../utils/error";

export default class RegionController {
  private repository: RegionRepository;
  constructor(client: DynamoDBDocumentClient) {
    this.repository = new RegionRepository(client);
  }

  getDetail = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {
      const id = event.queryStringParameters?.id;
      if (!id) {
        throw badRequest();
      }
      const usecase = new RegionUsecase.GetDetailUsecase(this.repository);
      const item = await usecase.execute(id);
      return successResponse(item);
    } catch (error) {
      return errorResponse(error);
    }
  };
  getSummaries = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {
      const usecase = new RegionUsecase.GetSummariesUsecase(this.repository);
      const summaries = await usecase.execute();
      return successResponse(summaries);
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
      const usecase = new RegionUsecase.PostUsecase(this.repository);
      const result = await usecase.execute(data, userSub);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };
}
