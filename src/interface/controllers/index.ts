import DistrictController from "./DistrictController";
import LocationController from "./LocationController";
import RegionController from "./RegionController";
import RouteController from "./RouteController";

interface Controllers {
  region: RegionController;
  district: DistrictController;
  route: RouteController;
  location: LocationController;
}

export { Controllers };
