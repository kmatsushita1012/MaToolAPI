import { Coordinate } from "../shared";

interface Location {
  districtId: string;
  coordinate: Coordinate;
  timestamp: Date;
}

export default Location;
