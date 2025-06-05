import GetUsecase from "./GetUsecase";
import GetAllUsecase from "./GetAllUsecase";
import PostUsecase from "./PostUsecase";
import PutUsecase from "./PutUsecase";
import GetTools from "./GetTools";

interface DistrictUsecases {
  get: GetUsecase;
  getAll: GetAllUsecase;
  post: PostUsecase;
  put: PutUsecase;
  getTools: GetTools;
}
export {
  GetUsecase as GetDistrictUsecase,
  GetAllUsecase as GetAllDistrictUsecase,
  PostUsecase as PostDistrictUsecase,
  PutUsecase as PutDistrictUsecase,
  GetTools as GetToolsDistrictUsecase,
  DistrictUsecases,
};
