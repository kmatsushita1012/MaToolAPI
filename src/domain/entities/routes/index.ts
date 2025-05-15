import { District } from "../districts";
import { SimpleDate } from "../shared";
import Route from "./Route";
import PublicRoute from "./PublicRoute";
import RouteSummary from "./RouteSummary";

export {
  Route,
  PublicRoute,
  RouteSummary,
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

const toPublicRoute = (route: Route, district: District): PublicRoute => {
  return { ...route, districtName: district.name };
};

const toRouteSummary = (route: PublicRoute): RouteSummary => {
  const { id, districtId, districtName, date, title } = route; // 必要な情報のみ取り出し
  return { id, districtId, districtName, date, title };
};

const removeTime = (route: PublicRoute): PublicRoute => {
  return {
    ...route,
    start: null,
    goal: null,
    points: route.points.map((point) => ({
      ...point,
      time: null,
    })),
  };
};
