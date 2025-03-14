import { Location, LocationWithET } from "../../models/location";

export default abstract class ILocationRepository {
  abstract get(id: string): Promise<Location>;
  abstract put(location: LocationWithET): Promise<string>;
}
