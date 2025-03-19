import { SimpleDate, SimpleTime } from "../../../domain/models/share";
import {
  makeRouteId,
  Route,
  RouteAndLocation,
  RouteWithId,
} from "../../../domain/models/route";
import IRouteRepository from "../../../domain/interface/repository/IRouteRepository";
import ILocationRepository from "../../../domain/interface/repository/ILocationRepository";
import { Location } from "../../../domain/models/location";
import { badRequest, notFound } from "../../../utils/Errors";
import { compareDate, compareDateAndTime } from "../../../utils/DateTimeUtils";

export default class GetDetailUsecase {
  constructor(
    private routeRepository: IRouteRepository,
    private locationRepository: ILocationRepository
  ) {}

  execute = async (
    districtId: string,
    date: SimpleDate | null,
    title: string | null
  ): Promise<RouteAndLocation> => {
    let route: Route;
    const currentFullDate = new Date();
    const currentDate: SimpleDate = {
      year: currentFullDate.getFullYear(),
      month: currentFullDate.getMonth() + 1,
      day: currentFullDate.getDate(),
    };
    if (date && title) {
      route = await this.getSpecifiedRoute(districtId, date, title);
    } else if (!date && !title) {
      const currentTime = {
        hour: currentFullDate.getHours(),
        minute: currentFullDate.getMinutes(),
      };
      route = await this.getCurrentRoute(districtId, currentDate, currentTime);
    } else {
      throw badRequest("Inappropriate parameters");
    }
    if (!route) {
      throw notFound();
    }
    let location: Location | null = null;
    if (compareDate(currentDate, route.date) !== 0) {
      location = await this.locationRepository.get(districtId);
    }
    const response: RouteAndLocation = {
      route: route,
      location: location,
    };
    return response;
  };

  private getSpecifiedRoute = async (
    districtId: string,
    date: SimpleDate,
    title: string
  ): Promise<Route> => {
    const routeId = makeRouteId(date, title);
    const item = await this.routeRepository.get(districtId, routeId);
    const route = item as Route;
    return route;
  };

  private getCurrentRoute = async (
    districtId: string,
    date: SimpleDate,
    time: SimpleTime
  ) => {
    const items = await this.routeRepository.query(districtId);
    const routeWithId = this.selectCurrentItem(items, date, time);
    const route = routeWithId as Route;
    return route;
  };

  private selectCurrentItem = (
    items: RouteWithId[],
    date: SimpleDate,
    time: SimpleTime
  ) => {
    //ソート
    const sortedItems = items.sort((a, b) =>
      compareDateAndTime(
        { dateA: a.date, timeA: a.start },
        { dateB: b.date, timeB: b.start }
      )
    );
    //期間が近いものをreturn
    let target: Record<string, any> = sortedItems[sortedItems.length - 1];
    for (let i = sortedItems.length - 1; i >= 0; i--) {
      const item = sortedItems[i];
      const start = item.start;
      const diffOfStart = compareDateAndTime(
        { dateA: item.date, timeA: start },
        { dateB: date, timeB: time }
      );
      const goal = item.goal;
      let diffOfGoal = compareDateAndTime(
        { dateA: item.date, timeA: goal },
        { dateB: date, timeB: time }
      );
      //時間内
      if (diffOfStart <= 0 && diffOfGoal > 0) {
        return sortedItems[i];
      }
      // 一候補
      if (diffOfStart > 0) {
        target = sortedItems[i];
        continue;
      }
      //候補が適切
      if (diffOfGoal < 0) {
        return target;
      }
    }
  };
}
