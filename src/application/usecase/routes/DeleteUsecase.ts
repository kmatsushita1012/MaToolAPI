import { SimpleDate } from "../../../domain/models/shared";
import IRouteRepository from "../../../domain/interfaces/repository/IRouteRepository";
import { Errors } from "../../../utils/Errors";
import { makeRouteId } from "../../../domain/models/routes";

export default class DeleteUsecase {
  constructor(private repository: IRouteRepository) {}

  execute = async (
    districtId: string,
    date: SimpleDate,
    title: string,
    userSub: string
  ): Promise<string> => {
    if (districtId !== userSub) {
      throw Errors.Unauthorized();
    }
    const routeId = makeRouteId(date, title);
    const result = await this.repository.delete(districtId, date, title);
    return result;
  };
}
