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
import { compareDate, convertDate, include } from "../../../utils/DateTime";
import { ILocationRepository, IRegionRepository } from "../../../domain/interface/repository";
import { toPublicLocation, Location } from "../../../domain/entities/locations";
import { District } from "../../../domain/entities/districts";
import { tryOrNull } from "../../../utils/Others";
export default class GetCurrentUsecaseV2 {
  constructor(
    private routeRepository: IRouteRepository,
    private districtRepository: IDistrictRepository,
    private locationRepository: ILocationRepository,
    private regionRepository: IRegionRepository
  ) { }

  execute = async (
    districtId: string,
    user: UserRole
  ): Promise<CurrentResponse> => {
    const district = await this.districtRepository.get(districtId);
    if (!district) {
      throw Errors.NotFound();
    }
    let routes: Route[] | null;
    let current: Route | null;
    let location: Location | null;
    if (
      district?.visibility === Visibility.AdminOnly &&
      (user.type === UserRoleType.Guest ||
        (user.type === UserRoleType.District && user.id !== districtId) ||
        (user.type === UserRoleType.Region && user.id !== district?.regionId))
    ) {
      routes = null;
      current = null;
    } else {
      routes = await tryOrNull(this.routeRepository.query(districtId));
      current = await tryOrNull(this.getCurrentRoute(districtId, new Date()));
    }
    if ((user.type === UserRoleType.Region && user.id === district.regionId) ||
      user.type === UserRoleType.District && user.id === districtId
    ) {
      location = await tryOrNull(this.getForAdmin(districtId));
    } else {
      location = await tryOrNull(this.getForPublic(districtId));
    }

    const currentResponse: CurrentResponse = {
      current: current !== null ? this.removeTimeIfNeeded(district, toPublicRoute(current, district), user) : null,
      routes: routes?.map((r) => toRouteSummary(toPublicRoute(r, district))) || null,
      location: location !== null ? toPublicLocation(location, district) : null,
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
    console.log(`GetCurrentUsecaseV2: get current route for district ${districtId} at ${date.toISOString()}`);
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

  private getForPublic = async (id: string) => {
    const currentTime = new Date();
    let district = await this.districtRepository.get(id);
    if (!district) {
      throw Errors.NotFound();
    }
    let region = await this.regionRepository.get(district.regionId);
    if (!region) {
      throw Errors.NotFound();
    }
    var foundFlag = false;
    for (let span of region.spans) {
      const start = new Date(span.start * 1000);
      const end = new Date(span.end * 1000);
      if (include(start, end, currentTime)) {
        foundFlag = true;
        break
      }
    }
    if (!foundFlag) {
      throw Errors.Forbidden();
    }
    return await this.locationRepository.get(id);
  };
  private getForAdmin = async (id: string) => {
    return await this.locationRepository.get(id);
  };


}
