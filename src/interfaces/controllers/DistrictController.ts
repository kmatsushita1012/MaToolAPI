import {
  APIGatewayRequest,
  parseBody,
  parseParams,
  parseQuery,
  parseUserSub,
} from "../request";
import { District } from "../../domain/models/districts";
import DistrictUsecase from "../../application/usecase/districts";
import { ApiResponse, errorResponse, successResponse } from "../responses";
import IRepository from "../../domain/interface/repository";

export default class DistrictController {
  constructor(private repository: IRepository) {}

  get = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId!,
      }));
      const usecase = new DistrictUsecase.GetUsecase(
        this.repository.district,
        this.repository.region
      );
      const result = await usecase.execute(districtId);
      return successResponse(result);
    } catch (error) {
      console.log(error);
      return errorResponse(error);
    }
  };

  getAll = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { regionId } = parseParams(req, (params) => ({
        regionId: params.regionId!,
      }));
      const usecase = new DistrictUsecase.GetAllUsecase(
        this.repository.district,
        this.repository.region
      );
      const result = await usecase.execute(regionId);
      return successResponse(result);
    } catch (error) {
      console.log(error);
      return errorResponse(error);
    }
  };

  post = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const data = parseBody<District>(req);
      const userSub = parseUserSub(req);
      const usecase = new DistrictUsecase.PostUsecase(this.repository.district);
      const result = await usecase.execute(data, userSub);
      return successResponse(result);
    } catch (error) {
      console.log(error);
      throw errorResponse(error);
    }
  };

  put = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId!,
      }));
      const data = parseBody<District>(req);
      const userSub = parseUserSub(req);
      const usecase = new DistrictUsecase.PutUsecase(this.repository.district);
      const result = await usecase.execute(districtId, data, userSub);
      return successResponse(result);
    } catch (error) {
      console.log(error);
      throw errorResponse(error);
    }
  };
}
