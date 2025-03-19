import {
  parseParams,
  APIGatewayRequest,
  parseUserSub,
  parseBody,
} from "../request";
import { Region } from "../../domain/models/regions";
import RegionUsecase from "../../application/usecase/regions";
import { badRequest } from "../../utils/Errors";
import { ApiResponse, successResponse, errorResponse } from "../responses";
import IRegionRepository from "../../domain/interface/repository/IRegionRepository";

export default class RegionController {
  constructor(private repository: IRegionRepository) {}

  getDetail = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { id } = parseParams(req, (params) => ({ id: params.id! }));
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
  getSummaries = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      console.log("controller");
      const usecase = new RegionUsecase.GetSummariesUsecase(this.repository);
      const summaries = await usecase.execute();
      return successResponse(summaries);
    } catch (error) {
      return errorResponse(error);
    }
  };
  post = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const data = parseBody<Region>(req);
      const userSub = parseUserSub(req);
      const usecase = new RegionUsecase.PostUsecase(this.repository);
      const result = await usecase.execute(data, userSub);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };
}
