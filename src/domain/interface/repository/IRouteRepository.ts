import { Route } from "../../models/routes";
import { SimpleDate } from "../../models/shared";

export default abstract class IRouteRepository {
  abstract query(districtId: string): Promise<Route[]>;
  abstract get(
    districtId: string,
    date: SimpleDate,
    title: string
  ): Promise<Route | null>;
  abstract post(route: Route): Promise<string>;
  abstract put(route: Route): Promise<string>;
  abstract delete(
    districtId: string,
    date: SimpleDate,
    title: string
  ): Promise<string>;
}
