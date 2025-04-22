import IRouteRepository from "../../../domain/interface/repository/IRouteRepository";
import { Errors } from "../../../utils/Errors";
import IDistrictRepository from "../../../domain/interface/repository/IDistrictRepository";
import { SimpleDate } from "../../../domain/models/shared";
import { Route, toPublicRoute } from "../../../domain/models/routes";
import { compareDate, convertDate } from "../../../utils/DateTime";

export default class GetUsecase {
  constructor(
    private routeRepository: IRouteRepository,
    private districtRepository: IDistrictRepository
  ) {}

  execute = async (districtId: string): Promise<Route> => {
    const currentFullDate = new Date();
    const district = await this.districtRepository.get(districtId);
    const route = await this.getCurrentRoute(districtId, new Date());
    if (!route || !district) {
      throw Errors.NotFound();
    }
    return toPublicRoute(route, district);
  };

  private getCurrentRoute = async (
    districtId: string,
    date: Date
  ): Promise<Route> => {
    const items = await this.routeRepository.query(districtId);
    const route = this.selectCurrentItem(items, date);
    return route;
  };

  private selectCurrentItem = (items: Route[], date: Date): Route => {
    //ソート
    const sortedItems = items.sort((a, b) => {
      const dateA = convertDate(a.date, a.start);
      const dateB = convertDate(b.date, b.start);
      return compareDate(dateB, dateA);
    });
    //期間が近いものをreturn
    let target: Route = sortedItems[sortedItems.length - 1];
    for (let i = sortedItems.length - 1; i >= 0; i--) {
      const item = sortedItems[i];
      const start = convertDate(item.date, item.start);
      const diffOfStart = compareDate(start, date);
      const goal = convertDate(item.date, item.goal);
      const diffOfGoal = compareDate(goal, date);
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
    return target;
  };
}
