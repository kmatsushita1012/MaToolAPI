import { District } from "../../models/districts";

export default abstract class IDistrictRepository {
  abstract get(id: string): Promise<District>;
  abstract scan(regionId: string): Promise<District[]>;
  abstract put(item: District): Promise<string>;
}
