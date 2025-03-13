import { APIGatewayProxyResult } from "aws-lambda";
import { makeRouteId } from "../../utils/routeUtils";
import { Route, RouteWithId } from "../../domain/models/route";
import { RouteRepository } from "../../domain/interface/repository/RouteRepository";

class PostRouteUsecase {
  constructor(private routeRepository: RouteRepository) {}

  async execute(route: Route, userSub: String): Promise<string> {
    const id = route.districtId;
    //ID確認
    if (!userSub) {
      throw new Error();
    }
    if (route.districtId !== userSub) {
      throw new Error();
    }
    const routeId = makeRouteId(route.date, route.title);
    const routeWithId: RouteWithId = { ...route, routeId: routeId };
    const result = await this.routeRepository.putItem(routeWithId);
    return result;
  }
}
export default PostRouteUsecase;
