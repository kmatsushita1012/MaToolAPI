import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { badRequestResponse, successResponse } from "../../utils/responses";
import { fromJson } from "../../utils/formatter";
import { District } from "../../domain/models/districts";
import { DistrictRepository } from "../repository/DistrictRepository";
import IDistrictRepository from "../../domain/interface/repository/IDistrictRepository";
import DistrictUsecase from "../../application/usecase/districts";

export default class DistrictController {
  private repository: IDistrictRepository;
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
    const usecase = new DistrictUsecase.GetDetailUsecase(this.repository);
    const result = await usecase.execute(id);
    return successResponse(result);
  };

  getSummaries = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    const regionId = event.queryStringParameters?.regionId;
    if (!regionId) {
      return badRequestResponse();
    }
    const usecase = new DistrictUsecase.GetSummariesUsecase(this.repository);
    const result = await usecase.execute(regionId);
    return successResponse(result);
  };

  post = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    if (!event.body) {
      return badRequestResponse();
    }
    const data = fromJson<District>(event.body);
    const userSub = event.requestContext.authorizer?.claims?.sub;
    const usecase = new DistrictUsecase.PostUsecase(this.repository);
    const result = await usecase.execute(data, userSub);
    return successResponse(result);
  };
}
