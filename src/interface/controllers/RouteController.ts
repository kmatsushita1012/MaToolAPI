import { SimpleDate, UserRole } from "../../domain/entities/shared";
import { Route } from "../../domain/entities/routes";
import { successResponse, errorResponse, ApiResponse } from "../responses";
import { parseBody, parseParams, parseQuery } from "../request";
import { RouteUsecases } from "../../application/usecases/routes";
import { Request } from "express";

export default class RouteController {
  constructor(private usecases: RouteUsecases) {}

  get = async (req: Request): Promise<ApiResponse> => {
    console.log(`Route get`);
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
      const user = req.user ?? UserRole.Guest();
      const result = await this.usecases.get.execute(
        districtId,
        date,
        title,
        user
      );
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };

  getAll = async (req: Request): Promise<ApiResponse> => {
    try {
      console.log(`Route getAll1`);
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId as string,
      }));
      const user = req.user ?? UserRole.Guest();
      console.log(`Route getAll2 ${districtId} ${user}`);
      const result = this.usecases.getAll.execute(districtId, user);
      return successResponse(result);
    } catch (error) {
      console.log(`Route getAll error ${error}`);
      return errorResponse(error);
    }
  };

  getCurrent = async (req: Request): Promise<ApiResponse> => {
    console.log(`Route getCurrent`);
    try {
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId as string,
      }));
      const user = req.user ?? UserRole.Guest();
      const result = await this.usecases.getCurrent.execute(districtId, user);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };

  post = async (req: Request): Promise<ApiResponse> => {
    console.log(`Route post`);
    try {
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId as string,
      }));
      const data = parseBody<Route>(req);
      const user = req.user ?? UserRole.Guest();
      const result = await this.usecases.post.execute(districtId, data, user);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };
  put = async (req: Request): Promise<ApiResponse> => {
    console.log(`Route put`);
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
      const user = req.user ?? UserRole.Guest();
      const result = await this.usecases.put.execute(
        districtId,
        date,
        title,
        data,
        user
      );
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };

  delete = async (req: Request): Promise<ApiResponse> => {
    console.log(`Route delete`);
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
      const user = req.user ?? UserRole.Guest();
      const date = new SimpleDate(year, month, day);
      const result = await this.usecases.delete.execute(
        districtId,
        date,
        title,
        user
      );
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };
}
