import IRouteRepository from "../../../domain/interfaces/repository/IRouteRepository";
import {
  RouteSummary,
  toPublicRoute,
  toRouteSummary,
} from "../../../domain/entities/routes";
import { IDistrictRepository } from "../../../domain/interfaces/repository";
import { Errors } from "../../../utils/Errors";
import { UserRole, UserRoleType } from "../../../domain/entities/shared";

export default class GetAllUsecase {
  constructor(
    private routeRepository: IRouteRepository,
    private districtRepository: IDistrictRepository
  ) {}

  execute = async (id: string, user: UserRole): Promise<RouteSummary[]> => {
    const district = await this.districtRepository.get(id);
    if (
      district?.visibility === Visibility.AdminOnly ||
      user.type === UserRoleType.Guest ||
      (user.type === UserRoleType.District && user.id !== id) ||
      (user.type === UserRoleType.Region && user.id !== district?.regionId)
    ) {
      throw Errors.Forbidden();
    }
    if (!district) {
      throw Errors.NotFound();
    }
    const details = await this.routeRepository.query(id);
    const summaries: RouteSummary[] = details.map((item) =>
      toRouteSummary(toPublicRoute(item, district))
    );
    return summaries;
  };
}
