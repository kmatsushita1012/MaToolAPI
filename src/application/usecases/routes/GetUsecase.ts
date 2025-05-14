import IRouteRepository from "../../../domain/interfaces/repository/IRouteRepository";
import { Errors } from "../../../utils/Errors";
import IDistrictRepository from "../../../domain/interfaces/repository/IDistrictRepository";
import {
  SimpleDate,
  UserRole,
  UserRoleType,
} from "../../../domain/entities/shared";
import { Route, toPublicRoute } from "../../../domain/entities/routes";

export default class GetUsecase {
  constructor(
    private routeRepository: IRouteRepository,
    private districtRepository: IDistrictRepository
  ) {}

  execute = async (
    id: string,
    date: SimpleDate,
    title: string,
    user: UserRole
  ): Promise<Route> => {
    const district = await this.districtRepository.get(id);
    if (
      district?.visibility === Visibility.AdminOnly &&
      (user.type === UserRoleType.Guest ||
        (user.type === UserRoleType.District && user.id !== id) ||
        (user.type === UserRoleType.Region && user.id !== district?.regionId))
    ) {
      throw Errors.Forbidden();
    }
    const route = await this.routeRepository.get(id, date, title);
    if (!route || !district) {
      throw Errors.NotFound();
    }
    return toPublicRoute(route, district);
  };
}
