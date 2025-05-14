import { Repositories } from "../../../domain/interfaces/repository";
import DeleteUsecase from "./DeleteUsecase";
import GetUsecase from "./GetUsecase";
import PutUsecase from "./PutUsecase";

interface LocationUsecases {
  get: GetUsecase;
  put: PutUsecase;
  delete: DeleteUsecase;
}

export {
  LocationUsecases,
  GetUsecase as GetLocationUsecase,
  PutUsecase as PutLocationUsecase,
  DeleteUsecase as DeleteLocationUsecase,
};
