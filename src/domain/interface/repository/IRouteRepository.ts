import { RouteWithId } from "../../models/route";

export default abstract class IRouteRepository {
  abstract query(districtId: string): Promise<RouteWithId[]>;
  abstract get(districtId: string, routeId: string): Promise<RouteWithId>;
  abstract put(route: RouteWithId): Promise<string>;
  abstract delete(districtId: string, routeId: string): Promise<string>;
}
