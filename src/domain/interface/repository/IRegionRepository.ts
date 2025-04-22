import { Region } from "../../models/regions";

export default abstract class IRegionRepository {
  abstract get(id: string): Promise<Region | null>;
  abstract scan(): Promise<Region[]>;
  abstract put(item: Region): Promise<string>;
}
