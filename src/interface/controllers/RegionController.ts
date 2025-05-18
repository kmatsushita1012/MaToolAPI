import { parseBody, parseParams } from "../request";
import { Region } from "../../domain/entities/regions";
import { ApiResponse, successResponse, errorResponse } from "../responses";
import { RegionUsecases } from "../../application/usecases/regions";
import { Request } from "express";
import { UserRole } from "../../domain/entities/shared";

export default class RegionController {
  constructor(private usecases: RegionUsecases) {}

  get = async (req: Request): Promise<ApiResponse> => {
    try {
      const { regionId } = parseParams(req, (params) => ({
        regionId: params.regionId!,
      }));

      const item = await this.usecases.get.execute(regionId);
      return successResponse(item);
    } catch (error) {
      return errorResponse(error);
    }
  };
  getAll = async (req: Request): Promise<ApiResponse> => {
    try {
      const items = await this.usecases.getAll.execute();
      return successResponse(items);
    } catch (error) {
      return errorResponse(error);
    }
  };
  put = async (req: Request): Promise<ApiResponse> => {
    try {
      const { regionId } = parseParams(req, (params) => ({
        regionId: params.regionId! as string,
      }));
      const data = parseBody<Region>(req);
      const user = req.user ?? UserRole.Guest();
      const message = await this.usecases.put.execute(regionId, data, user);
      return successResponse(message);
    } catch (error) {
      return errorResponse(error);
    }
  };
}
