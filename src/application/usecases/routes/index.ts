import PutUsecase from "./PutUsecase";
import DeleteUsecase from "./DeleteUsecase";
import GetUsecase from "./GetUsecase";
import GetAllUsecase from "./GetAllUsecase";
import PostUsecase from "./PostUsecase";
import GetCurrentUsecase from "./GetCurrentUsecase";

interface RouteUsecases {
  get: GetUsecase;
  getAll: GetAllUsecase;
  getCurrent: GetCurrentUsecase;
  post: PostUsecase;
  put: PutUsecase;
  delete: DeleteUsecase;
}
export {
  RouteUsecases,
  GetUsecase as GetRouteUsecase,
  GetAllUsecase as GetAllRouteUsecase,
  GetCurrentUsecase as GetCurrentRouteUsecase,
  PostUsecase as PostRouteUsecase,
  PutUsecase as PutRouteUsecase,
  DeleteUsecase as DeleteRouteUsecase,
};
