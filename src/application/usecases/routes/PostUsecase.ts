import { Route } from "../../../domain/entities/routes";
import { UserRole, UserRoleType } from "../../../domain/entities/shared";
import IRouteRepository from "../../../domain/interfaces/repository/IRouteRepository";
import { Errors } from "../../../utils/Errors";

export default class PostRouteUsecase {
  constructor(private routeRepository: IRouteRepository) {}

  async execute(id: string, route: Route, user: UserRole): Promise<string> {
    if (
      user.type === UserRoleType.Guest ||
      id !== user.id ||
      route.districtId !== user.id
    ) {
      throw Errors.Unauthorized();
    }
    const result = await this.routeRepository.post(route);
    return result;
  }
}
