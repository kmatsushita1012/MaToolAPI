import { Repositories } from "../../../domain/interface/repository";
import DeleteUsecase from "./DeleteUsecase";
import GetAllUsecase from "./GetAllUsecase";
import GetUsecase from "./GetUsecase";
import PutUsecase from "./PutUsecase";

interface LocationUsecases {
  get: GetUsecase;
  getAll: GetAllUsecase;
  put: PutUsecase;
  delete: DeleteUsecase;
}

export {
  LocationUsecases,
  GetUsecase as GetLocationUsecase,
  GetAllUsecase as GetAllLocationUsecase,
  PutUsecase as PutLocationUsecase,
  DeleteUsecase as DeleteLocationUsecase,
};
