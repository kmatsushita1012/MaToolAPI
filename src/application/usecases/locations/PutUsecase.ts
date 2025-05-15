import ILocationRepository from "../../../domain/interfaces/repository/ILocationRepository";
import {
  Location,
  toExpirableLocation,
} from "../../../domain/entities/locations";
import { add } from "../../../utils/DateTime";
import { Errors } from "../../../utils/Errors";
import { UserRole, UserRoleType } from "../../../domain/entities/shared";

export default class PutUsecae {
  constructor(private repository: ILocationRepository) {}

  execute = async (
    id: string,
    item: Location,
    user: UserRole
  ): Promise<string> => {
    console.log(
      `LocationPut ${JSON.stringify(user)} ${JSON.stringify(item)} ${id}`
    );

    if (
      user.type === UserRoleType.Guest ||
      id !== user.id ||
      id !== item.districtId
    ) {
      throw Errors.Unauthorized();
    }
    const timestamp = new Date(item.timestamp * 1000);
    const expirationTime = add(timestamp, expirationSpan);
    const locationWithET = toExpirableLocation(item, expirationTime);
    const result = await this.repository.put(locationWithET);
    return result;
  };
}

const expirationSpan = 3 * 60 * 60 * 1000;
