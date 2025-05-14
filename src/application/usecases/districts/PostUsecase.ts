import IDistrictRepository from "../../../domain/interfaces/repository/IDistrictRepository";
import { District } from "../../../domain/entities/districts";
import { Errors } from "../../../utils/Errors";
import { UserRole, UserRoleType } from "../../../domain/entities/shared";

export default class PostUsecase {
  constructor(private repository: IDistrictRepository) {}
  execute = async (item: District, user: UserRole) => {
    if (user.type === UserRoleType.Guest || item.id !== user.id) {
      throw Errors.Unauthorized();
    }
    const result = await this.repository.post(item);
    return result;
  };
}
