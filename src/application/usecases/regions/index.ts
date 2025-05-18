import GetUsecase from "./GetUsecase";
import GetAllUsecase from "./GetAllUsecase";
import PutUsecase from "./PutUsecase";
import { Repositories } from "../../../domain/interface/repository";

interface RegionUsecases {
  get: GetUsecase;
  getAll: GetAllUsecase;
  put: PutUsecase;
}

export {
  RegionUsecases,
  GetUsecase as GetRegionUsecase,
  GetAllUsecase as GetAllRegionUsecase,
  PutUsecase as PutRegionUsecase,
};
