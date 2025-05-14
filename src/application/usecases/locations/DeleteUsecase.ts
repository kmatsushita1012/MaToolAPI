import { Errors } from "../../../utils/Errors";
import ILocationRepository from "../../../domain/interfaces/repository/ILocationRepository";
import { UserRole, UserRoleType } from "../../../domain/entities/shared";

export default class DeleteUsecase {
  constructor(private repository: ILocationRepository) {}

  execute = async (id: string, user: UserRole): Promise<string> => {
    if (user.type === UserRoleType.Guest || id !== user.id) {
      throw Errors.Unauthorized();
    }
    const result = await this.repository.delete(id);
    return result;
  };
}
