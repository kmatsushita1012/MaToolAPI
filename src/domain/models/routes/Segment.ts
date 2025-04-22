import { Coordinate } from "../shared";

interface Segment {
  id: string;
  start: Coordinate;
  end: Coordinate;
  coordinates: [Coordinate];
  isPassed: boolean;
}

export default Segment;
