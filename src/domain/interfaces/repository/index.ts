import IDistrictRepository from "./IDistrictRepository";
import ILocationRepository from "./ILocationRepository";
import IRegionRepository from "./IRegionRepository";
import IRouteRepository from "./IRouteRepository";

export default abstract class IRepository {
  public abstract readonly region: IRegionRepository;
  public abstract readonly district: IDistrictRepository;
  public abstract readonly route: IRouteRepository;
  public abstract readonly location: ILocationRepository;
}

export {
  IRegionRepository,
  IDistrictRepository,
  IRouteRepository,
  ILocationRepository,
};
