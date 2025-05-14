import IRouteRepository from "../../../domain/interfaces/repository/IRouteRepository";
import { Errors } from "../../../utils/Errors";
import IDistrictRepository from "../../../domain/interfaces/repository/IDistrictRepository";
import {
  SimpleDate,
  UserRole,
  UserRoleType,
  Visibility,
} from "../../../domain/entities/shared";
import {
  PublicRoute,
  removeTime,
  toPublicRoute,
} from "../../../domain/entities/routes";

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
  ): Promise<PublicRoute> => {
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
    if (
      district?.visibility === Visibility.Partial &&
      (user.type === UserRoleType.Guest ||
        (user.type === UserRoleType.District && user.id !== id) ||
        (user.type === UserRoleType.Region && user.id !== district?.regionId))
    ) {
      return removeTime(toPublicRoute(route, district));
    } else {
      return toPublicRoute(route, district);
    }
  };
}
