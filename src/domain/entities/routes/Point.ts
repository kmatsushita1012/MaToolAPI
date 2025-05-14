import { Coordinate, SimpleTime } from "../shared";

interface Point {
  id: string;
  coordinate: Coordinate;
  title: string | null;
  description: string | null;
  time: SimpleTime | null;
  isPassed: boolean;
  shouldExport: boolean;
}

export default Point;
