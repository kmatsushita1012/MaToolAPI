import { makeRouteId } from "../../../utils/routeUtils";
import { SimpleDate } from "../../../domain/models/share";
import IRouteRepository from "../../../domain/interface/repository/IRouteRepository";
import { unauthorized } from "../../../utils/Errors";

export default class DeleteUsecase {
  constructor(private repository: IRouteRepository) {}

  execute = async (
    districtId: string,
    date: SimpleDate,
    title: string,
    userSub: string
  ): Promise<string> => {
    if (districtId !== userSub) {
      throw unauthorized();
    }
    const routeId = makeRouteId(date, title);
    const result = await this.repository.delete(districtId, routeId);
    return result;
  };
}
