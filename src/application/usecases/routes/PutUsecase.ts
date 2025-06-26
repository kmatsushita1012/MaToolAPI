import { Route } from "../../../domain/entities/routes";
import IRouteRepository from "../../../domain/interface/repository/IRouteRepository";
import { Errors } from "../../../utils/Errors";
import {
  SimpleDate,
  UserRole,
  UserRoleType,
} from "../../../domain/entities/shared";

export default class PutRouteUsecase {
  constructor(private routeRepository: IRouteRepository) {}

  async execute(id: string, route: Route, user: UserRole): Promise<string> {
    const old = await this.routeRepository.get(id);
    if (!old) {
      throw Errors.NotFound();
    }
    if (
      user.type === UserRoleType.Guest ||
      route.districtId !== user.id ||
      old.districtId !== user.id
    ) {
      throw Errors.Unauthorized();
    }
    const result = await this.routeRepository.put(route);
    return result;
  }
}
