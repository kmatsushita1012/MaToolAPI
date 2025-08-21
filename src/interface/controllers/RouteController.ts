import {
  SimpleDate,
  UserRole,
  UserRoleType,
} from "../../domain/entities/shared";
import { Route } from "../../domain/entities/routes";
import { successResponse, errorResponse, ApiResponse } from "../responses";
import { parseBody, parseParams, parseQuery } from "../request";
import { RouteUsecases } from "../../application/usecases/routes";
import { Request } from "express";

export default class RouteController {
  constructor(private usecases: RouteUsecases) {}

  get = async (req: Request): Promise<ApiResponse> => {
    try {
      const { routeId } = parseParams(req, (params) => ({
        routeId: params.routeId!,
      }));
      const user = req.user ?? UserRole.Guest();
      const result = await this.usecases.get.execute(routeId, user);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };

  getAll = async (req: Request): Promise<ApiResponse> => {
    try {
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId as string,
      }));
      const user = req.user ?? UserRole.Guest();
      const result = await this.usecases.getAll.execute(districtId, user);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };

  getCurrent = async (req: Request): Promise<ApiResponse> => {
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

  getCurrentV2 = async (req: Request): Promise<ApiResponse> => {
    try {
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId as string,
      }));
      const user = req.user ?? UserRole.Guest();
      const result = await this.usecases.getCurrentV2.execute(districtId, user);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };

  getIds = async (req: Request): Promise<ApiResponse> => {
    try {
      const user = req.user ?? UserRole.Guest();
      const result = await this.usecases.getIds.execute(user);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };

  post = async (req: Request): Promise<ApiResponse> => {
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
    try {
      const { routeId } = parseParams(req, (params) => ({
        routeId: params.routeId!,
      }));
      const data = parseBody<Route>(req);
      const user = req.user ?? UserRole.Guest();
      const result = await this.usecases.put.execute(routeId, data, user);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };

  delete = async (req: Request): Promise<ApiResponse> => {
    try {
      const { routeId } = parseParams(req, (params) => ({
        routeId: params.routeId!,
      }));
      const user = req.user ?? UserRole.Guest();
      const result = await this.usecases.delete.execute(routeId, user);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };
}
