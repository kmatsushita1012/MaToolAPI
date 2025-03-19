import { bool } from "aws-sdk/clients/signer";
import { Coordinate, SimpleDate, SimpleTime, UUID } from "./share";
import { Location } from "./location";
interface Route {
  districtId: string;
  date: SimpleDate;
  title: string;
  description: string | null;
  points: Point[];
  segments: Segment[];
  start: SimpleTime;
  goal: SimpleTime;
}

interface RouteWithId extends Route {
  routeId: string;
}

interface RouteAndLocation {
  route: Route;
  location: Location | null;
}

interface RouteSummary {
  districtId: string;
  date: SimpleDate;
  title: string;
}

interface Point {
  id: UUID;
  coordinate: Coordinate;
  title: string | null;
  description: string | null;
  time: SimpleTime | null;
  isPassed: bool;
}

interface Segment {
  id: UUID;
  start: Coordinate;
  end: Coordinate;
  coordinates: [Coordinate];
  isPassed: bool;
}

const makeRouteId = (date: SimpleDate, title: string) => {
  return `${date.year}${String(date.month).padStart(2, "0")}${String(
    date.day
  ).padStart(2, "0")}${title}`;
};

const toRouteWithId = (route: Route): RouteWithId => {
  const routeId = makeRouteId(route.date, route.title);
  return { ...route, routeId };
};

export {
  Route,
  RouteAndLocation,
  RouteSummary,
  RouteWithId,
  makeRouteId,
  toRouteWithId,
};
