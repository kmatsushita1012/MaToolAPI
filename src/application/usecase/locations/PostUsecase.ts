import ILocationRepository from "../../../domain/interface/repository/ILocationRepository";
import {
  Location,
  LocationWithET,
  toLocationWithET,
} from "../../../domain/models/location";
import { SimpleDate, SimpleTime } from "../../../domain/models/share";
import { calculateExpirationTime } from "../../../utils/DateTimeUtils";
import { unauthorized } from "../../../utils/Errors";

export default class PostUsecae {
  constructor(private repository: ILocationRepository) {}

  execute = async (item: Location, userSub: string): Promise<string> => {
    if (item.districtId !== userSub) {
      throw unauthorized;
    }
    //変換
    const expirationTime = calculateExpirationTime(
      item.date,
      item.time,
      expirationSpan
    );
    const locationWithET = toLocationWithET(item, expirationTime);
    const result = await this.repository.put(locationWithET);
    return result;
  };
}

const expirationSpan = 3 * 60 * 60 * 1000;
