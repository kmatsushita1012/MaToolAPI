import IRouteRepository from "../../../domain/interfaces/repository/IRouteRepository";
import {
  RouteSummary,
  toPublicRoute,
  toRouteSummary,
} from "../../../domain/entities/routes";
import { IDistrictRepository } from "../../../domain/interfaces/repository";
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

  execute = async (id: string, user: UserRole): Promise<RouteSummary[]> => {
    console.log(`GetAllUsecase1 ${id}`);
    const district = await this.districtRepository.get(id);
    console.log(`GetAllUsecase2 ${district?.id}`);
    if (
      district?.visibility === Visibility.AdminOnly &&
      (user.type === UserRoleType.Guest ||
        (user.type === UserRoleType.District && user.id !== id) ||
        (user.type === UserRoleType.Region && user.id !== district?.regionId))
    ) {
      console.log(`GetAllUsecase Forbidden`);
      throw Errors.Forbidden();
    }
    if (!district) {
      throw Errors.NotFound();
    }
    const details = await this.routeRepository.query(id);
    if (!details) {
      return [];
    }
    console.log(`GetAllUsecase3 ${details}`);
    const summaries: RouteSummary[] = details.map((item) =>
      toRouteSummary(toPublicRoute(item, district))
    );
    console.log(`GetAllUsecase4 ${summaries}`);
    return summaries;
  };
}
