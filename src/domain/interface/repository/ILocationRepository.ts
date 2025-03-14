import { Location } from "../../models/location";

export default abstract class ILocationRepository {
  abstract get(id: string): Promise<Location>;
  abstract put(location: Location): Promise<string>;
}
