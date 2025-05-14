import IDistrictRepository from "../../../domain/interfaces/repository/IDistrictRepository";
import { District } from "../../../domain/entities/districts";
import { Errors } from "../../../utils/Errors";
import { UserRole, UserRoleType } from "../../../domain/entities/shared";

export default class PutUsecase {
  constructor(private repository: IDistrictRepository) {}
  execute = async (id: string, item: District, user: UserRole) => {
    if (
      user.type === UserRoleType.Guest ||
      id !== user.id ||
      item.id !== user.id
    ) {
      throw Errors.Unauthorized();
    }
    const result = await this.repository.put(item.id, item);
    return result;
  };
}
