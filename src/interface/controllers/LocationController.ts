import { parseBody, parseParams, parseQuery } from "../request";
import { Request } from "express";
import { ApiResponse, successResponse, errorResponse } from "../responses";
import { Location } from "../../domain/entities/locations";
import { LocationUsecases } from "../../application/usecases/locations";
import { UserRole } from "../../domain/entities/shared";

export default class LocationController {
  constructor(private usecases: LocationUsecases) {}

  get = async (req: Request): Promise<ApiResponse> => {
    try {
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId!,
      }));
      const user = req.user ?? UserRole.Guest();
      const location = await this.usecases.get.execute(districtId, user);
      return successResponse(location);
    } catch (error) {
      return errorResponse(error);
    }
  };

  getAll = async (req: Request): Promise<ApiResponse> => {
    try {
      const { regionId } = parseParams(req, (params) => ({
        regionId: params.regionId!,
      }));
      const user = req.user ?? UserRole.Guest();
      const location = await this.usecases.getAll.execute(regionId, user);
      return successResponse(location);
    } catch (error) {
      return errorResponse(error);
    }
  };

  put = async (req: Request): Promise<ApiResponse> => {
    try {
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId!,
      }));
      const data = parseBody<Location>(req);
      const user = req.user ?? UserRole.Guest();
      const result = await this.usecases.put.execute(districtId, data, user);
      return successResponse(result);
    } catch (error) {
      return errorResponse(error);
    }
  };

  delete = async (req: Request): Promise<ApiResponse> => {
    try {
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId!,
      }));
      const user = req.user ?? UserRole.Guest();
      const location = await this.usecases.delete.execute(districtId, user);
      return successResponse(location);
    } catch (error) {
      return errorResponse(error);
    }
  };
}
