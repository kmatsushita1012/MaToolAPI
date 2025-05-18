import IDistrictRepository from "./IDistrictRepository";
import ILocationRepository from "./ILocationRepository";
import IRegionRepository from "./IRegionRepository";
import IRouteRepository from "./IRouteRepository";
interface Repositories {
  region: IRegionRepository;
  district: IDistrictRepository;
  route: IRouteRepository;
  location: ILocationRepository;
}
export {
  IRegionRepository,
  IDistrictRepository,
  IRouteRepository,
  ILocationRepository,
  Repositories,
};
