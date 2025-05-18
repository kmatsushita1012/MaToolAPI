import { Route } from "../../../domain/entities/routes";
import { UserRole, UserRoleType } from "../../../domain/entities/shared";
import IRouteRepository from "../../../domain/interface/repository/IRouteRepository";
import { Errors } from "../../../utils/Errors";

export default class PostRouteUsecase {
  constructor(private routeRepository: IRouteRepository) {}

  async execute(
    districtId: string,
    route: Route,
    user: UserRole
  ): Promise<string> {
    if (
      user.type === UserRoleType.Guest ||
      districtId !== user.id ||
      route.districtId !== user.id
    ) {
      throw Errors.Unauthorized();
    }
    const result = await this.routeRepository.post(route);
    return result;
  }
}
