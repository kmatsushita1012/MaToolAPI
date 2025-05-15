import { Coordinate } from "../shared";

interface Location {
  districtId: string;
  coordinate: Coordinate;
  timestamp: number;
}

export default Location;
