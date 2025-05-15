import {
  SimpleDate,
  UserRole,
  UserRoleType,
} from "../../../domain/entities/shared";
import IRouteRepository from "../../../domain/interfaces/repository/IRouteRepository";
import { Errors } from "../../../utils/Errors";
import { makeRouteId } from "../../../domain/entities/routes";

export default class DeleteUsecase {
  constructor(private routeRepository: IRouteRepository) {}

  execute = async (id: string, user: UserRole): Promise<string> => {
    const old = await this.routeRepository.get(id);
    if (!old) {
      throw Errors.NotFound();
    }
    if (user.type === UserRoleType.Guest || old.districtId !== user.id) {
      throw Errors.Unauthorized();
    }
    const result = await this.routeRepository.delete(id);
    return result;
  };
}
