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
  Route,
  toPublicRoute,
} from "../../../domain/entities/routes";
import { compareDate, convertDate } from "../../../utils/DateTime";
export default class GetCurrentUsecase {
  constructor(
    private routeRepository: IRouteRepository,
    private districtRepository: IDistrictRepository
  ) {}

  execute = async (
    districtId: string,
    user: UserRole
  ): Promise<PublicRoute> => {
    const district = await this.districtRepository.get(districtId);
    if (
      district?.visibility === Visibility.AdminOnly &&
      (user.type === UserRoleType.Guest ||
        (user.type === UserRoleType.District && user.id !== districtId) ||
        (user.type === UserRoleType.Region && user.id !== district?.regionId))
    ) {
      throw Errors.Forbidden();
    }
    let route = await this.getCurrentRoute(districtId, new Date());
    if (!route || !district) {
      throw Errors.NotFound();
    }
    if (
      district?.visibility === Visibility.Partial &&
      (user.type === UserRoleType.Guest ||
        (user.type === UserRoleType.District && user.id !== districtId) ||
        (user.type === UserRoleType.Region && user.id !== district?.regionId))
    ) {
      return removeTime(toPublicRoute(route, district));
    } else {
      return toPublicRoute(route, district);
    }
  };

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
