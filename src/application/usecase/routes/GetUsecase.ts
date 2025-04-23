import IRouteRepository from "../../../domain/interfaces/repository/IRouteRepository";
import { Errors } from "../../../utils/Errors";
import IDistrictRepository from "../../../domain/interfaces/repository/IDistrictRepository";
import { SimpleDate } from "../../../domain/models/shared";
import { Route, toPublicRoute } from "../../../domain/models/routes";

export default class GetUsecase {
  constructor(
    private routeRepository: IRouteRepository,
    private districtRepository: IDistrictRepository
  ) {}

  execute = async (
    districtId: string,
    date: SimpleDate,
    title: string
  ): Promise<Route> => {
    const district = await this.districtRepository.get(districtId);
    const route = await this.routeRepository.get(districtId, date, title);
    if (!route || !district) {
      throw Errors.NotFound();
    }
    return toPublicRoute(route, district);
  };
}
