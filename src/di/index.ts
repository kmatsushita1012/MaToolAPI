import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Usecases } from "../application/usecases";
import {
  DistrictUsecases,
  GetAllDistrictUsecase,
  GetDistrictUsecase,
  PostDistrictUsecase,
  PutDistrictUsecase,
} from "../application/usecases/districts";
import {
  DeleteLocationUsecase,
  GetAllLocationUsecase,
  GetLocationUsecase,
  LocationUsecases,
  PutLocationUsecase,
} from "../application/usecases/locations";
import {
  RegionUsecases,
  GetRegionUsecase,
  GetAllRegionUsecase,
  PutRegionUsecase,
} from "../application/usecases/regions";
import {
  DeleteRouteUsecase,
  GetAllRouteUsecase,
  GetCurrentRouteUsecase,
  GetRouteUsecase,
  PostRouteUsecase,
  PutRouteUsecase,
  RouteUsecases,
} from "../application/usecases/routes";
import { Repositories } from "../domain/interface/repository";
import {
  DynamoDBRegionRepository,
  DynamoDBDistrictRepository,
  DynamoDBRouteRepository,
  DynamoDBLocationRepository,
  TableNames,
} from "../inflastructure/repositories/DynamoDB";
import { Controllers } from "../interface/controllers";
import DistrictController from "../interface/controllers/DistrictController";
import LocationController from "../interface/controllers/LocationController";
import RegionController from "../interface/controllers/RegionController";
import RouteController from "../interface/controllers/RouteController";
import { CognitoUserManager } from "../inflastructure/manager";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import GetToolsUsecase from "../application/usecases/districts/GetTools";

export {
  createDistrictUsecases,
  createLocationUsecases,
  createRegionUsecases,
  createRouteUsecases,
  createUsecases,
  createControllers,
  createDynamoDBRepositories,
  createCognitoUserManager,
};

const createDynamoDBRepositories = (
  client: DynamoDBDocumentClient,
  tableName: TableNames
): Repositories => ({
  region: new DynamoDBRegionRepository(client, tableName.region),
  district: new DynamoDBDistrictRepository(client, tableName.district),
  route: new DynamoDBRouteRepository(client, tableName.route),
  location: new DynamoDBLocationRepository(client, tableName.location),
});

const createCognitoUserManager = (
  client: CognitoIdentityProviderClient,
  userPoolId: string
): CognitoUserManager => new CognitoUserManager(client, userPoolId);

const createDistrictUsecases = (
  repositories: Repositories,
  manager: CognitoUserManager
): DistrictUsecases => ({
  get: new GetDistrictUsecase(repositories.district, repositories.region),
  getAll: new GetAllDistrictUsecase(repositories.district, repositories.region),
  post: new PostDistrictUsecase(
    repositories.district,
    repositories.region,
    manager
  ),
  put: new PutDistrictUsecase(repositories.district),
  getTools: new GetToolsUsecase(repositories.district, repositories.region),
});

const createLocationUsecases = (
  repositories: Repositories
): LocationUsecases => ({
  get: new GetLocationUsecase(
    repositories.location,
    repositories.district,
    repositories.region
  ),
  getAll: new GetAllLocationUsecase(
    repositories.location,
    repositories.district,
    repositories.region
  ),
  put: new PutLocationUsecase(repositories.location),
  delete: new DeleteLocationUsecase(repositories.location),
});

const createRegionUsecases = (repositories: Repositories): RegionUsecases => ({
  get: new GetRegionUsecase(repositories.region),
  getAll: new GetAllRegionUsecase(repositories.region),
  put: new PutRegionUsecase(repositories.region),
});

const createRouteUsecases = (repositories: Repositories): RouteUsecases => ({
  get: new GetRouteUsecase(repositories.route, repositories.district),
  getAll: new GetAllRouteUsecase(repositories.route, repositories.district),
  getCurrent: new GetCurrentRouteUsecase(
    repositories.route,
    repositories.district
  ),
  post: new PostRouteUsecase(repositories.route),
  put: new PutRouteUsecase(repositories.route),
  delete: new DeleteRouteUsecase(repositories.route),
});

const createUsecases = (
  repositories: Repositories,
  manager: CognitoUserManager
): Usecases => ({
  regions: createRegionUsecases(repositories),
  districts: createDistrictUsecases(repositories, manager),
  routes: createRouteUsecases(repositories),
  locations: createLocationUsecases(repositories),
});

const createControllers = (usecases: Usecases): Controllers => ({
  region: new RegionController(usecases.regions),
  district: new DistrictController(usecases.districts),
  route: new RouteController(usecases.routes),
  location: new LocationController(usecases.locations),
});
