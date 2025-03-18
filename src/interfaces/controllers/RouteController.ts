import { SimpleDate } from "../../domain/models/share";
import RouteUsecase from "../../application/usecase/routes";
import { Route } from "../../domain/models/route";
import IRouteRepository from "../../domain/interface/repository/IRouteRepository";
import ILocationRepository from "../../domain/interface/repository/ILocationRepository";
import { badRequest } from "../../utils/Errors";
import { successResponse, errorResponse, ApiResponse } from "../responses";
import {
  APIGatewayRequest,
  parseBody,
  parseParams,
  parseUserSub,
} from "../request";

export default class RouteController {
  constructor(
    private routeRepository: IRouteRepository,
    private locationRepository: ILocationRepository
  ) {}
  getSummaries = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId,
      }));
      const usecase = new RouteUsecase.GetSummariesUsecase(
        this.routeRepository
      );
      const result = usecase.execute(districtId);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };

  getDetail = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { districtId, year, month, day, title } = parseParams(
        req,
        (params) => ({
          districtId: params.districtId!,
          year: params.year ?? null,
          month: params.month ?? null,
          day: params.day ?? null,
          title: params.title ?? null,
        })
      );
      let date = year && month && day ? new SimpleDate(year, month, day) : null;
      const usecase = new RouteUsecase.GetDetailUsecase(
        this.routeRepository,
        this.locationRepository
      );
      const result = await usecase.execute(districtId, date, title);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };

  post = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const data = parseBody<Route>(req);
      const userSub = parseUserSub(req);
      const usecase = new RouteUsecase.PostUsecase(this.routeRepository);
      const result = await usecase.execute(data, userSub);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };

  delete = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { districtId, year, month, day, title } = parseParams(
        req,
        (params) => ({
          districtId: params.districtId,
          year: Number(params.year),
          month: Number(params.month),
          day: Number(params.day),
          title: params.title,
        })
      );
      const userSub = parseUserSub(req);
      const date = {
        year: year,
        month: month,
        day: day,
      };
      const usecase = new RouteUsecase.DeleteUsecase(this.routeRepository);
      const result = await usecase.execute(districtId, date, title, userSub);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };
}
