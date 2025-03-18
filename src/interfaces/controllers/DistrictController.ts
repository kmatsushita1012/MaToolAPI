import {
  APIGatewayRequest,
  parseBody,
  parseParams,
  parseUserSub,
} from "../request";
import { District } from "../../domain/models/districts";
import IDistrictRepository from "../../domain/interface/repository/IDistrictRepository";
import DistrictUsecase from "../../application/usecase/districts";
import { ApiResponse, errorResponse, successResponse } from "../responses";

export default class DistrictController {
  constructor(private repository: IDistrictRepository) {}

  getDetail = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { id } = parseParams(req, (params) => ({ id: params.id! }));
      const usecase = new DistrictUsecase.GetDetailUsecase(this.repository);
      const result = await usecase.execute(id);
      return successResponse(result);
    } catch (error) {
      console.log(error);
      return errorResponse(error);
    }
  };

  getSummaries = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { regionId } = parseParams(req, (params) => ({
        regionId: params.regionId!,
      }));
      const usecase = new DistrictUsecase.GetSummariesUsecase(this.repository);
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
      const usecase = new DistrictUsecase.PostUsecase(this.repository);
      const result = await usecase.execute(data, userSub);
      return successResponse(result);
    } catch (error) {
      console.log(error);
      throw errorResponse(error);
    }
  };
}
