import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import IRepository from "../../../domain/interface/repository";
import IDistrictRepository from "../../../domain/interface/repository/IDistrictRepository";
import ILocationRepository from "../../../domain/interface/repository/ILocationRepository";
import IRegionRepository from "../../../domain/interface/repository/IRegionRepository";
import IRouteRepository from "../../../domain/interface/repository/IRouteRepository";
import RegionRepositoryDynamoDB from "./RegionRepository";
import DistrictRepositoryDynamoDB from "./DistrictRepository";
import RouteRepositoryDynamoDB from "./RouteRepository";
import LocationRepositoryDynamoDB from "./LocationRepository";

export default class AWSRepository extends IRepository {
  private client: DynamoDBDocumentClient;
  public readonly region: IRegionRepository;
  public readonly district: IDistrictRepository;
  public readonly route: IRouteRepository;
  public readonly location: ILocationRepository;

  constructor(client: DynamoDBDocumentClient) {
    super();
    this.client = client;
    this.region = new RegionRepositoryDynamoDB(this.client);
    this.district = new DistrictRepositoryDynamoDB(this.client);
    this.route = new RouteRepositoryDynamoDB(this.client);
    this.location = new LocationRepositoryDynamoDB(this.client);
  }
}
