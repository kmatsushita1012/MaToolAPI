import { Region } from "../../../domain/entities/regions";
import { UserRole, UserRoleType } from "../../../domain/entities/shared";
import IRegionRepository from "../../../domain/interface/repository/IRegionRepository";
import { Errors } from "../../../utils/Errors";

export default class PutUsecase {
  constructor(private repository: IRegionRepository) {}
  execute = async (
    id: string,
    item: Region,
    user: UserRole
  ): Promise<string> => {
    if (
      user.type === UserRoleType.Guest ||
      id !== user.id ||
      item.id !== user.id
    ) {
      throw Errors.Unauthorized();
    }
    const result = await this.repository.put(item);
    return result;
  };
}
