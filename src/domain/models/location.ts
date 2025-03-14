import { Coordinate, SimpleDate, SimpleTime } from "./share";

export type Location = {
  districtId: string;
  coordinate: Coordinate;
  date: SimpleDate;
  time: SimpleTime;
};

export type LocationWithET = Location & {
  expirationTime: number;
};
