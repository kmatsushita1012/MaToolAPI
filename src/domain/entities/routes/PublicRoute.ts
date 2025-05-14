import { SimpleTime } from "../shared";
import Route from "./Route";

interface PublicRoute extends Omit<Route, "start" | "goal"> {
  districtName: string;
  start: SimpleTime | null;
  goal: SimpleTime | null;
}

export default PublicRoute;
