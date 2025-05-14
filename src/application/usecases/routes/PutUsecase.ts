import { Route } from "../../../domain/entities/routes";
import IRouteRepository from "../../../domain/interfaces/repository/IRouteRepository";
import { Errors } from "../../../utils/Errors";
import {
  SimpleDate,
  UserRole,
  UserRoleType,
} from "../../../domain/entities/shared";

export default class PutRouteUsecase {
  constructor(private routeRepository: IRouteRepository) {}

  async execute(
    id: string,
    date: SimpleDate,
    title: string,
    route: Route,
    user: UserRole
  ): Promise<string> {
    if (
      user.type === UserRoleType.Guest ||
      id !== user.id ||
      route.districtId !== user.id
    ) {
      throw Errors.Unauthorized();
    }

    const result = await this.routeRepository.put(route);
    return result;
  }
}
