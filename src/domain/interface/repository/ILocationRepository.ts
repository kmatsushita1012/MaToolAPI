import { Location, ExpirableLocation } from "../../entities/locations";

export default abstract class ILocationRepository {
  abstract get(id: string): Promise<Location | null>;
  abstract getAll(id: string): Promise<Location[]>;
  abstract put(location: ExpirableLocation): Promise<string>;
  abstract delete(id: string): Promise<string>;
}
