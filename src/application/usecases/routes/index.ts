import PutUsecase from "./PutUsecase";
import DeleteUsecase from "./DeleteUsecase";
import GetUsecase from "./GetUsecase";
import GetAllUsecase from "./GetAllUsecase";
import PostUsecase from "./PostUsecase";
import GetCurrentUsecase from "./GetCurrentUsecase";
import GetIdsUsecase from "./GetIdsUsecase";
import GetCurrentUsecaseV2 from "./GetCurrentUsecaseV2";

interface RouteUsecases {
  get: GetUsecase;
  getAll: GetAllUsecase;
  getCurrent: GetCurrentUsecase;
  getCurrentV2: GetCurrentUsecaseV2;
  getIds: GetIdsUsecase;
  post: PostUsecase;
  put: PutUsecase;
  delete: DeleteUsecase;
}
export {
  RouteUsecases,
  GetUsecase as GetRouteUsecase,
  GetAllUsecase as GetAllRouteUsecase,
  GetCurrentUsecase as GetCurrentRouteUsecase,
  GetCurrentUsecaseV2 as GetCurrentRouteV2Usecase,
  GetIdsUsecase as GetIdsRouteUsecase,
  PostUsecase as PostRouteUsecase,
  PutUsecase as PutRouteUsecase,
  DeleteUsecase as DeleteRouteUsecase,
};
