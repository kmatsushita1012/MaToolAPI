import { Route } from "../../../domain/models/routes";
import IRouteRepository from "../../../domain/interface/repository/IRouteRepository";
import { Errors } from "../../../utils/Errors";

export default class PostRouteUsecase {
  constructor(private routeRepository: IRouteRepository) {}

  async execute(
    districtId: string,
    route: Route,
    userSub: string
  ): Promise<string> {
    if (districtId !== userSub || districtId !== route.districtId) {
      throw Errors.Unauthorized();
    }
    const result = await this.routeRepository.post(route);
    return result;
  }
}
