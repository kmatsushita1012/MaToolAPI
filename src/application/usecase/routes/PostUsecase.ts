import { makeRouteId } from "../../../utils/routeUtils";
import { Route, RouteWithId } from "../../../domain/models/route";
import IRouteRepository from "../../../domain/interface/repository/IRouteRepository";
import { unauthorized } from "../../../utils/error";

export default class PostRouteUsecase {
  constructor(private routeRepository: IRouteRepository) {}

  async execute(route: Route, userSub: string): Promise<string> {
    const id = route.districtId;
    if (route.districtId !== userSub) {
      throw unauthorized();
    }
    const routeId = makeRouteId(route.date, route.title);
    const routeWithId: RouteWithId = { ...route, routeId: routeId };
    const result = await this.routeRepository.put(routeWithId);
    return result;
  }
}
