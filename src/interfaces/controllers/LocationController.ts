import {
  APIGatewayRequest,
  parseBody,
  parseParams,
  parseUserSub,
} from "../request";
import { Region } from "aws-sdk/clients/budgets";
import LocationUsecase from "../../application/usecase/locations";
import { ApiResponse, successResponse, errorResponse } from "../responses";
import ILocationRepository from "../../domain/interface/repository/ILocationRepository";

export default class LocationController {
  constructor(private repository: ILocationRepository) {}

  get = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { id } = parseParams(req, (params) => ({ id: params.id! }));
      const userSub = parseUserSub(req);
      const usecase = new LocationUsecase.GetUsecase(this.repository);
      const location = await usecase.execute(id, userSub);
      return successResponse(location);
    } catch (error) {
      return errorResponse(error);
    }
  };

  post = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const data = parseBody<Region>(req);
      const userSub = parseUserSub(req);
      const usecase = new LocationUsecase.GetUsecase(this.repository);
      const result = await usecase.execute(data, userSub);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };
}
