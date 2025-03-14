import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { badRequestResponse, successResponse } from "../../utils/responses";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { fromJson } from "../../utils/formatter";
import { Region } from "../../domain/models/regions";
import { RegionRepository } from "../repository/RegionRepository";
import RegionUsecase from "../../application/usecase/regions";

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
    const usecase = new RegionUsecase.GetDetailUsecase(this.repository);
    const item = await usecase.execute(id);
    return successResponse(item);
  };
  getSummaries = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    const usecase = new RegionUsecase.GetSummariesUsecase(this.repository);
    const summaries = await usecase.execute();
    return successResponse(summaries);
  };
  post = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    if (!event.body) {
      return badRequestResponse();
    }
    const data = fromJson<Region>(event.body);
    const userSub = event.requestContext.authorizer?.claims?.sub;
    if (!data || !userSub) {
      return badRequestResponse();
    }
    const usecase = new RegionUsecase.PostUsecase(this.repository);
    const result = await usecase.execute(data, userSub);
    return successResponse(result);
  };
}
