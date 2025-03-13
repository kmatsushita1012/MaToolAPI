import { bool } from "aws-sdk/clients/signer";
import { Coordinate, SimpleDate, SimpleTime, UUID } from "./share";

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

export type RouteSummary = {
  districtId: string;
  date: SimpleDate;
  title: string;
};

export type Point = {
  id: UUID;
  coordinate: Coordinate;
  title: String | null;
  description: String | null;
  time: SimpleTime | null;
  isPassed: bool;
};

export type Segment = {
  id: UUID;
  start: Coordinate;
  end: Coordinate;
  coordinates: [Coordinate];
  isPassed: bool;
};
