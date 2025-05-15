import { SimpleDate, SimpleTime } from "../shared";
import Point from "./Point";
import Segment from "./Segment";

interface Route {
  id: string;
  districtId: string;
  date: SimpleDate;
  title: string;
  description: string | null;
  points: Point[];
  segments: Segment[];
  start: SimpleTime;
  goal: SimpleTime;
}

export default Route;
