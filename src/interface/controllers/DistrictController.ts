import { parseBody, parseParams } from "../request";
import { District } from "../../domain/entities/districts";
import { ApiResponse, errorResponse, successResponse } from "../responses";
import { DistrictUsecases } from "../../application/usecases/districts";
import { Request } from "express";
import { UserRole } from "../../domain/entities/shared";

export default class DistrictController {
  constructor(private usecases: DistrictUsecases) {}

  get = async (req: Request): Promise<ApiResponse> => {
    try {
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId as string,
      }));
      const result = await this.usecases.get.execute(districtId);
      return successResponse(result);
    } catch (error) {
      console.log(error);
      return errorResponse(error);
    }
  };

  getAll = async (req: Request): Promise<ApiResponse> => {
    try {
      const { regionId } = parseParams(req, (params) => ({
        regionId: params.regionId as string,
      }));
      const result = await this.usecases.getAll.execute(regionId);
      return successResponse(result);
    } catch (error) {
      console.log(error);
      return errorResponse(error);
    }
  };

  post = async (req: Request): Promise<ApiResponse> => {
    try {
      const data = parseBody<District>(req);
      const user = req.user ?? UserRole.Guest();
      const result = await this.usecases.post.execute(data, user);
      return successResponse(result);
    } catch (error) {
      console.log(error);
      throw errorResponse(error);
    }
  };

  put = async (req: Request): Promise<ApiResponse> => {
    try {
      const { districtId } = parseParams(req, (params) => ({
        districtId: params.districtId!,
      }));
      const data = parseBody<District>(req);
      const user = req.user ?? UserRole.Guest();
      const result = await this.usecases.put.execute(districtId, data, user);
      return successResponse(result);
    } catch (error) {
      console.log(error);
      throw errorResponse(error);
    }
  };
}
