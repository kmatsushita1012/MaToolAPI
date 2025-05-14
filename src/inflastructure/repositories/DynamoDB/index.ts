import DynamoDBRegionRepository from "./RegionRepository";
import DynamoDBDistrictRepository from "./DistrictRepository";
import DynamoDBRouteRepository from "./RouteRepository";
import DynamoDBLocationRepository from "./LocationRepository";

interface TableNames {
  region: string;
  district: string;
  route: string;
  location: string;
}

export {
  DynamoDBRegionRepository,
  DynamoDBDistrictRepository,
  DynamoDBRouteRepository,
  DynamoDBLocationRepository,
  TableNames,
};
