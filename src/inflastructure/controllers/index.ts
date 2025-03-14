import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import DistrictController from "./DistrictController";
import LocationController from "./LocationController";
import RegionController from "./RegionController";
import RouteController from "./RouteController";

export default class Controllers {
  public readonly region: RegionController;
  public readonly district: DistrictController;
  public readonly route: RouteController;
  public readonly location: LocationController;

  constructor(client: DynamoDBDocumentClient) {
    this.region = new RegionController(client);
    this.district = new DistrictController(client);
    this.route = new RouteController(client);
    this.location = new LocationController(client);
  }
}
