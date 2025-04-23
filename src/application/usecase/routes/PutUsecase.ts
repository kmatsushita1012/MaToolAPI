import { Route } from "../../../domain/models/routes";
import IRouteRepository from "../../../domain/interfaces/repository/IRouteRepository";
import { Errors } from "../../../utils/Errors";
import { SimpleDate } from "../../../domain/models/shared";

export default class PutRouteUsecase {
  constructor(private routeRepository: IRouteRepository) {}

  async execute(
    districtId: string,
    date: SimpleDate,
    title: string,
    route: Route,
    userSub: string
  ): Promise<string> {
    if (districtId !== route.districtId || districtId !== userSub) {
      throw Errors.Unauthorized();
    }
    const result = await this.routeRepository.put(route);
    return result;
  }
}
