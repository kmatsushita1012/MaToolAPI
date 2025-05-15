import {
  SimpleDate,
  UserRole,
  UserRoleType,
} from "../../../domain/entities/shared";
import IRouteRepository from "../../../domain/interfaces/repository/IRouteRepository";
import { Errors } from "../../../utils/Errors";
import { makeRouteId } from "../../../domain/entities/routes";

export default class DeleteUsecase {
  constructor(private repository: IRouteRepository) {}

  execute = async (
    id: string,
    date: SimpleDate,
    title: string,
    user: UserRole
  ): Promise<string> => {
    if (user.type === UserRoleType.Guest || id !== user.id) {
      throw Errors.Unauthorized();
    }
    const result = await this.repository.delete(id, date, title);
    return result;
  };
}
