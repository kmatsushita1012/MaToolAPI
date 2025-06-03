import { SimpleTime } from "../shared";
import Route from "./Route";

interface PublicRoute extends Route {
  districtName: string;
}

export default PublicRoute;
