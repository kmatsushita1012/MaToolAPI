import GetUsecase from "./GetUsecase";
import GetAllUsecase from "./GetAllUsecase";
import PostUsecase from "./PostUsecase";
import PutUsecase from "./PutUsecase";

interface DistrictUsecases {
  get: GetUsecase;
  getAll: GetAllUsecase;
  post: PostUsecase;
  put: PutUsecase;
}
export {
  GetUsecase as GetDistrictUsecase,
  GetAllUsecase as GetAllDistrictUsecase,
  PostUsecase as PostDistrictUsecase,
  PutUsecase as PutDistrictUsecase,
  DistrictUsecases,
};
