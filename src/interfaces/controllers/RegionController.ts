import {
  APIGatewayRequest,
  parseUserSub,
  parseBody,
  parseParams,
} from "../request";
import { Region } from "../../domain/models/regions";
import RegionUsecase from "../../application/usecase/regions";
import { ApiResponse, successResponse, errorResponse } from "../responses";
import IRepository from "../../domain/interface/repository";

export default class RegionController {
  constructor(private repository: IRepository) {}

  get = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { regionId } = parseParams(req, (params) => ({
        regionId: params.regionId!,
      }));
      const usecase = new RegionUsecase.GetUsecase(this.repository.region);
      const item = await usecase.execute(regionId);
      return successResponse(item);
    } catch (error) {
      return errorResponse(error);
    }
  };
  getAll = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const usecase = new RegionUsecase.GetAllUsecase(this.repository.region);
      const summaries = await usecase.execute();
      return successResponse(summaries);
    } catch (error) {
      return errorResponse(error);
    }
  };
  put = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { regionId } = parseParams(req, (params) => ({
        regionId: params.regionId!,
      }));
      const data = parseBody<Region>(req);
      const userSub = parseUserSub(req);
      const usecase = new RegionUsecase.PutUsecase(this.repository.region);
      const result = await usecase.execute(regionId, data, userSub);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };
}
