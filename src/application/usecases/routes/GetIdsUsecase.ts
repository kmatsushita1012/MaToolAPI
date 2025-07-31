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

  execute = async (user: UserRole): Promise<String[]> => {
    if (user.type !== UserRoleType.Region) {
      throw Errors.Forbidden();
    }
    const districts = await this.districtRepository.queryByRegion(user.id);
    if (!districts) {
      throw Errors.Forbidden();
    }
    const ids: String[] = [];
    for (const district of districts) {
      const summaries = await this.routeRepository.query(district.id);
      ids.push(...summaries.map((s) => s.id));
    }
    return ids;
  };
}
