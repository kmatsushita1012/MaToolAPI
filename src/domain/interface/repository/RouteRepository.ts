import { Route, RouteSummary, RouteWithId } from "../../models/route";

export interface RouteRepository {
  putItem(item: RouteWithId): Promise<string>;
  getSummaries(): Promise<RouteSummary[]>;
  GetCommandetails(id: string): Promise<Route>;
  deleteItem(districtId: string, routeId: String): Promise<string>;
}
