import { Coordinate, SimpleDate, SimpleTime } from "./share";

interface Location {
  districtId: string;
  coordinate: Coordinate;
  date: SimpleDate;
  time: SimpleTime;
}

interface LocationWithET extends Location {
  expirationTime: number;
}

const toLocationWithET = (
  item: Location,
  expirationTime: number
): LocationWithET => {
  return { ...item, expirationTime };
};

export { Location, LocationWithET, toLocationWithET };
