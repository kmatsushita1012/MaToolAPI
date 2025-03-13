import { Coordinate, SimpleDate, SimpleTime } from "./share";

export type Location = {
  districtId: String;
  coordinate: Coordinate;
  date: SimpleDate;
  time: SimpleTime;
};
