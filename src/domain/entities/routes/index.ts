import { District } from "../districts";
import { SimpleDate } from "../shared";
import Route from "./Route";
import PublicRoute from "./PublicRoute";
import RouteSummary from "./RouteSummary";
import StorableRoute from "./StorableRoute";

export {
  Route,
  PublicRoute,
  RouteSummary,
  StorableRoute,
  toStorableRoute,
  toPublicRoute,
  makeRouteId,
  toRouteSummary,
  removeTime,
};

const makeRouteId = (date: SimpleDate, title: string) => {
  return `${date.year}${String(date.month).padStart(2, "0")}${String(
    date.day
  ).padStart(2, "0")}${title}`;
};

const toStorableRoute = (route: Route): StorableRoute => {
  const routeId = makeRouteId(route.date, route.title);
  return { ...route, routeId };
};

const toPublicRoute = (route: Route, district: District): PublicRoute => {
  return { ...route, districtName: district.name };
};

const toRouteSummary = (route: PublicRoute): RouteSummary => {
  const { districtId, districtName, date, title } = route; // 必要な情報のみ取り出し
  return { districtId, districtName, date, title };
};

const removeTime = (route: Route): Route => {
  route.start = null;
  route.goal = null;
  route.points.forEach((point) => {
    point.time = null;
  });
  return route;
};
