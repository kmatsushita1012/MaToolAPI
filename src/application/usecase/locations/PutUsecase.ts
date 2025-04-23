import ILocationRepository from "../../../domain/interfaces/repository/ILocationRepository";
import {
  Location,
  toExpirableLocation,
} from "../../../domain/models/locations";
import { add } from "../../../utils/DateTime";
import { Errors } from "../../../utils/Errors";

export default class PutUsecae {
  constructor(private repository: ILocationRepository) {}

  execute = async (
    districtId: string,
    item: Location,
    userSub: string
  ): Promise<string> => {
    if (districtId !== userSub || districtId !== item.districtId) {
      throw Errors.Unauthorized;
    }
    const expirationTime = add(item.timestamp, expirationSpan);
    const locationWithET = toExpirableLocation(item, expirationTime);
    const result = await this.repository.put(locationWithET);
    return result;
  };
}

const expirationSpan = 3 * 60 * 60 * 1000;
