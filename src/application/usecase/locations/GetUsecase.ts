import ILocationRepository from "../../../domain/interface/repository/ILocationRepository";
import { unauthorized } from "../../../utils/error";

export default class GetUsecase {
  constructor(private repository: ILocationRepository) {}
  execute = async (id: string, userSub: string) => {
    if (id !== userSub) {
      throw unauthorized();
    }
    const location = this.repository.get(id);
    return location;
  };
}
