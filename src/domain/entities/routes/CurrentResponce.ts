import PublicLocation from "../locations/PublicLocation";
import { Coordinate } from "../shared";
import PublicRoute from "./PublicRoute";
import RouteSummary from "./RouteSummary";

export interface CurrentResponse {
    districtId: string;
    districtName: string;
    routes: RouteSummary[] | null;
    current: PublicRoute | null;
    location: PublicLocation | null;
}