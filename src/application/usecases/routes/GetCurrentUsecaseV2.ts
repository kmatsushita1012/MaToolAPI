import IRouteRepository from "../../../domain/interface/repository/IRouteRepository";
import { Errors } from "../../../utils/Errors";
import IDistrictRepository from "../../../domain/interface/repository/IDistrictRepository";
import {
  UserRole,
  UserRoleType,
  Visibility,
} from "../../../domain/entities/shared";
import {
  CurrentResponse,
  PublicRoute,
  removeTime,
  Route,
  toPublicRoute,
  toRouteSummary,
} from "../../../domain/entities/routes";
import { compareDate, convertDate } from "../../../utils/DateTime";
import { ILocationRepository } from "../../../domain/interface/repository";
import { toPublicLocation } from "../../../domain/entities/locations";
import { District } from "../../../domain/entities/districts";
export default class GetCurrentUsecaseV2 {
  constructor(
    private routeRepository: IRouteRepository,
    private districtRepository: IDistrictRepository,
    private locationRepository: ILocationRepository,
  ) { }

  execute = async (
    districtId: string,
    user: UserRole
  ): Promise<CurrentResponse> => {
    const district = await this.districtRepository.get(districtId);
    if (
      district?.visibility === Visibility.AdminOnly &&
      (user.type === UserRoleType.Guest ||
        (user.type === UserRoleType.District && user.id !== districtId) ||
        (user.type === UserRoleType.Region && user.id !== district?.regionId))
    ) {
      throw Errors.Forbidden();
    }
    if (!district) {
      throw Errors.NotFound();
    }
    let routes = await this.routeRepository.query(districtId);
    let current = await this.getCurrentRoute(districtId, new Date());
    let location = await this.locationRepository.get(districtId);

    const currentResponse: CurrentResponse = {
      current: current != null ? this.removeTimeIfNeeded(district, toPublicRoute(current, district), user) : null,
      routes: routes.map((r) => toRouteSummary(toPublicRoute(r, district))),
      location: location != null ? toPublicLocation(location, district) : null,
      districtId: district.id,
      districtName: district.name
    };
    return currentResponse;
  };

  private removeTimeIfNeeded = (district: District, route: PublicRoute, user: UserRole): PublicRoute => {
    if (
      district.visibility === Visibility.Partial &&
      (user.type === UserRoleType.Guest ||
        (user.type === UserRoleType.District && user.id !== district.id) ||
        (user.type === UserRoleType.Region && user.id !== district?.regionId))
    ) {
      return removeTime(route);
    }
    return route;
  }

  private getCurrentRoute = async (
    districtId: string,
    date: Date
  ): Promise<Route | null> => {
    const items = await this.routeRepository.query(districtId);
    if (!items || items.length === 0) {
      return null;
    }
    const route = this.selectCurrentItem(items, date);
    return route;
  };

  private selectCurrentItem = (items: Route[], now: Date): Route => {
    //ソート
    const sortedItems = items.sort((a, b) => {
      if (!b.start) {
        return -1;
      } else if (!a.start) {
        return 1;
      }
      const dateA = convertDate(a.date, a.start);
      const dateB = convertDate(b.date, b.start);
      return compareDate(dateB, dateA);
    });
    //期間が近いものをreturn
    let timeTarget: Route | undefined;
    let dateTarget: Route | undefined;
    for (let i = sortedItems.length - 1; i >= 0; i--) {
      const item = sortedItems[i];
      if (item.start && item.goal) {
        const start = convertDate(item.date, item.start);
        const diffOfStart = compareDate(start, now);
        const goal = convertDate(item.date, item.goal);
        const diffOfGoal = compareDate(goal, now);
        //時間内
        if (diffOfStart <= 0 && diffOfGoal > 0) {
          return sortedItems[i];
        }
        // 一候補
        if (diffOfStart > 0) {
          timeTarget = sortedItems[i];
          continue;
        }
        //候補が適切
        if (diffOfGoal < 0 && timeTarget) {
          return timeTarget;
        }
      } else {
        const fullDate = convertDate(item.date, { hour: 0, minute: 0 });
        if (compareDate(fullDate, now) === 0) {
          dateTarget = item;
        }
      }
    }
    return timeTarget ?? dateTarget ?? sortedItems[0];
  };
}
