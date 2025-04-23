import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import IRepository from "../../../domain/interfaces/repository";
import IDistrictRepository from "../../../domain/interfaces/repository/IDistrictRepository";
import ILocationRepository from "../../../domain/interfaces/repository/ILocationRepository";
import IRegionRepository from "../../../domain/interfaces/repository/IRegionRepository";
import IRouteRepository from "../../../domain/interfaces/repository/IRouteRepository";
import DynamoDBRegionRepository from "./RegionRepository";
import DynamoDBDistrictRepository from "./DistrictRepository";
import DynamoDBRouteRepository from "./RouteRepository";
import DynamoDBLocationRepository from "./LocationRepository";

export default class DynamoDBRepository extends IRepository {
  private client: DynamoDBDocumentClient;
  public readonly region: IRegionRepository;
  public readonly district: IDistrictRepository;
  public readonly route: IRouteRepository;
  public readonly location: ILocationRepository;

  constructor(client: DynamoDBDocumentClient) {
    super();
    this.client = client;
    this.region = new DynamoDBRegionRepository(this.client);
    this.district = new DynamoDBDistrictRepository(this.client);
    this.route = new DynamoDBRouteRepository(this.client);
    this.location = new DynamoDBLocationRepository(this.client);
  }
}
