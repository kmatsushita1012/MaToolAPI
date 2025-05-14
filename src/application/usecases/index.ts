import { Repositories } from "../../domain/interfaces/repository";
import { DistrictUsecases } from "./districts";
import { LocationUsecases } from "./locations";
import { RegionUsecases } from "./regions";
import { RouteUsecases } from "./routes";

interface Usecases {
  regions: RegionUsecases;
  districts: DistrictUsecases;
  routes: RouteUsecases;
  locations: LocationUsecases;
}

export { Usecases };
