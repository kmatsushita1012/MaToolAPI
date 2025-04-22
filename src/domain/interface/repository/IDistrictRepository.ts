import { District } from "../../models/districts";

export default abstract class IDistrictRepository {
  abstract get(id: string): Promise<District | null>;
  abstract queryByRegion(regionId: string): Promise<District[]>;
  abstract put(id: string, item: District): Promise<string>;
  abstract post(item: District): Promise<string>;
}
