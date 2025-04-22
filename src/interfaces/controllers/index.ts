import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import DistrictController from "./DistrictController";
import LocationController from "./LocationController";
import RegionController from "./RegionController";
import RouteController from "./RouteController";
import IRepository from "../../domain/interface/repository";

export default class Controller {
  public readonly region: RegionController;
  public readonly district: DistrictController;
  public readonly route: RouteController;
  public readonly location: LocationController;

  constructor(repository: IRepository) {
    this.region = new RegionController(repository);
    this.district = new DistrictController(repository);
    this.route = new RouteController(repository);
    this.location = new LocationController(repository);
  }

  all() {
    return {
      regionController: this.region,
      districtController: this.district,
      routeController: this.route,
      locationController: this.location,
    };
  }
}
