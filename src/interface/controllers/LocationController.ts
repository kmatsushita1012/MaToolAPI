import {
  APIGatewayRequest,
  parseBody,
  parseParams,
  parseQuery,
  parseUserSub,
} from "../request";
import LocationUsecase from "../../application/usecase/locations";
import { ApiResponse, successResponse, errorResponse } from "../responses";
import IRepository from "../../domain/interfaces/repository";
import { Location } from "../../domain/models/locations";

export default class LocationController {
  constructor(private repository: IRepository) {}

  get = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { districtId } = parseQuery(req, (params) => ({
        districtId: params.districtId!,
      }));
      const userSub = parseUserSub(req);
      const usecase = new LocationUsecase.GetUsecase(
        this.repository.location,
        this.repository.district,
        this.repository.region
      );
      const location = await usecase.execute(districtId, userSub);
      return successResponse(location);
    } catch (error) {
      return errorResponse(error);
    }
  };

  put = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { districtId } = parseQuery(req, (params) => ({
        districtId: params.districtId!,
      }));
      const data = parseBody<Location>(req);
      const userSub = parseUserSub(req);
      const usecase = new LocationUsecase.PutUsecase(this.repository.location);
      const result = await usecase.execute(districtId, data, userSub);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };

  delete = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId!,
      }));
      const userSub = parseUserSub(req);
      const usecase = new LocationUsecase.DeleteUsecase(
        this.repository.location
      );
      const location = await usecase.execute(districtId, userSub);
      return successResponse(location);
    } catch (error) {
      return errorResponse(error);
    }
  };
}
