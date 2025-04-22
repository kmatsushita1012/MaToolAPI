import { SimpleDate } from "../../domain/models/shared";
import RouteUsecase from "../../application/usecase/routes";
import { Route } from "../../domain/models/routes";
import { successResponse, errorResponse, ApiResponse } from "../responses";
import {
  APIGatewayRequest,
  parseBody,
  parseParams,
  parseQuery,
  parseUserSub,
} from "../request";
import IRepository from "../../domain/interface/repository";

export default class RouteController {
  constructor(private repository: IRepository) {}
  getAll = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId,
      }));
      const usecase = new RouteUsecase.GetAllUsecase(this.repository.route);
      const result = usecase.execute(districtId);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };

  get = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId!,
      }));
      const { year, month, day, title } = parseQuery(req, (params) => ({
        year: params.year,
        month: params.month,
        day: params.day,
        title: params.title,
      }));
      const date = new SimpleDate(year, month, day);
      const usecase = new RouteUsecase.GetUsecase(
        this.repository.route,
        this.repository.district
      );
      const result = await usecase.execute(districtId, date, title);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };

  getCurrent = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId!,
      }));
      const usecase = new RouteUsecase.GetCurrentUsecase(
        this.repository.route,
        this.repository.district
      );
      const result = await usecase.execute(districtId);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };

  post = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId!,
      }));
      const data = parseBody<Route>(req);
      const userSub = parseUserSub(req);
      const usecase = new RouteUsecase.PostUsecase(this.repository.route);
      const result = await usecase.execute(districtId, data, userSub);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };
  put = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId!,
      }));
      const { year, month, day, title } = parseQuery(req, (params) => ({
        year: params.year,
        month: params.month,
        day: params.day,
        title: params.title,
      }));
      const date = new SimpleDate(year, month, day);
      const data = parseBody<Route>(req);
      const userSub = parseUserSub(req);
      const usecase = new RouteUsecase.PutUsecase(this.repository.route);
      const result = await usecase.execute(
        districtId,
        date,
        title,
        data,
        userSub
      );
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
      const { year, month, day, title } = parseQuery(req, (params) => ({
        year: params.year,
        month: params.month,
        day: params.day,
        title: params.title,
      }));
      const userSub = parseUserSub(req);
      const date = new SimpleDate(year, month, day);
      const usecase = new RouteUsecase.DeleteUsecase(this.repository.route);
      const result = await usecase.execute(districtId, date, title, userSub);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };
}
