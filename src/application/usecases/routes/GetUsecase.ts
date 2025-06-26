import IRouteRepository from "../../../domain/interface/repository/IRouteRepository";
import { Errors } from "../../../utils/Errors";
import IDistrictRepository from "../../../domain/interface/repository/IDistrictRepository";
import {
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

  execute = async (id: string, user: UserRole): Promise<PublicRoute> => {
    const route = await this.routeRepository.get(id);
    if (!route) {
      throw Errors.NotFound();
    }
    const district = await this.districtRepository.get(route.districtId);
    if (
      district?.visibility === Visibility.AdminOnly &&
      (user.type === UserRoleType.Guest ||
        (user.type === UserRoleType.District && user.id !== district.id) ||
        (user.type === UserRoleType.Region && user.id !== district?.regionId))
    ) {
      throw Errors.Forbidden();
    }
    if (!district) {
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
