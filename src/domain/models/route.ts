import { bool } from "aws-sdk/clients/signer";
import { Coordinate, SimpleDate, SimpleTime, UUID } from "./share";
import { Location } from "./location";
export type Route = {
  districtId: string;
  date: SimpleDate;
  title: string;
  description: string | null;
  points: Point[];
  segments: Segment[];
  start: SimpleTime;
  goal: SimpleTime;
};

export type RouteWithId = Route & {
  routeId: string;
};

export type RouteAndLocation = {
  route: Route;
  location: Location | null;
};

export type RouteSummary = {
  districtId: string;
  date: SimpleDate;
  title: string;
};

type Point = {
  id: UUID;
  coordinate: Coordinate;
  title: string | null;
  description: string | null;
  time: SimpleTime | null;
  isPassed: bool;
};

type Segment = {
  id: UUID;
  start: Coordinate;
  end: Coordinate;
  coordinates: [Coordinate];
  isPassed: bool;
};
