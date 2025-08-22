import { SimpleTime, Visibility } from "../shared";
import Route from "./Route";

interface PublicRoute extends Route {
  districtName: string;
  visibility: Visibility;
}

export default PublicRoute;
