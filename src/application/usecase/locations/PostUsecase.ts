import ILocationRepository from "../../../domain/interface/repository/ILocationRepository";
import { Location, LocationWithET } from "../../../domain/models/location";
import { SimpleDate, SimpleTime } from "../../../domain/models/share";
import { unauthorized } from "../../../utils/error";

export default class PostUsecae {
  constructor(private repository: ILocationRepository) {}

  execute = async (location: Location, userSub: string): Promise<string> => {
    if (location.districtId !== userSub) {
      throw unauthorized;
    }
    //変換
    const expirationTime = this.calculateExpirationTime(
      location.date,
      location.time,
      expirationSpan
    );
    const locationWithET: LocationWithET = {
      ...location,
      expirationTime: expirationTime,
    };
    const result = await this.repository.put(locationWithET);
    return result;
  };

  private calculateExpirationTime = (
    date: SimpleDate,
    time: SimpleTime,
    span: number
  ) => {
    const isostring = `${date.year}-${date.month}-${date.day}T${time.hour}:${
      time.minute
    }:${0}Z`;
    const fullDate = new Date(isostring);
    const expirationDate = new Date(fullDate.getTime() + span);
    return Math.floor(expirationDate.getTime() / 1000);
  };
}

const expirationSpan = 3 * 60 * 60 * 1000;
