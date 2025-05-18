import IRouteRepository from "../../../domain/interface/repository/IRouteRepository";
import {
  Route,
  RouteSummary,
  toPublicRoute,
  toRouteSummary,
} from "../../../domain/entities/routes";
import { IDistrictRepository } from "../../../domain/interface/repository";
import { Errors } from "../../../utils/Errors";
import {
  UserRole,
  UserRoleType,
  Visibility,
} from "../../../domain/entities/shared";

export default class GetAllUsecase {
  constructor(
    private routeRepository: IRouteRepository,
    private districtRepository: IDistrictRepository
  ) {}

  execute = async (
    districtId: string,
    user: UserRole
  ): Promise<RouteSummary[]> => {
    const district = await this.districtRepository.get(districtId);
    if (!district) {
      throw Errors.NotFound();
    }
    if (
      district?.visibility === Visibility.AdminOnly &&
      (user.type === UserRoleType.Guest ||
        (user.type === UserRoleType.District && user.id !== districtId) ||
        (user.type === UserRoleType.Region && user.id !== district?.regionId))
    ) {
      throw Errors.Forbidden();
    }
    const details: Route[] = await this.routeRepository.query(districtId);
    if (!details || details.length === 0) {
      return [];
    }
    const summaries: RouteSummary[] = details.map((item) =>
      toRouteSummary(toPublicRoute(item, district))
    );
    return summaries;
  };
}
