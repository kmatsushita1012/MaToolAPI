import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import IRepository from "../../../domain/interface/repository";
import IDistrictRepository from "../../../domain/interface/repository/IDistrictRepository";
import ILocationRepository from "../../../domain/interface/repository/ILocationRepository";
import IRegionRepository from "../../../domain/interface/repository/IRegionRepository";
import IRouteRepository from "../../../domain/interface/repository/IRouteRepository";
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
