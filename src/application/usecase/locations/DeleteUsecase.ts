import { Errors } from "../../../utils/Errors";
import ILocationRepository from "../../../domain/interfaces/repository/ILocationRepository";

export default class DeleteUsecase {
  constructor(private repository: ILocationRepository) {}

  execute = async (id: string, userSub: string): Promise<string> => {
    if (id !== userSub) {
      throw Errors.Unauthorized();
    }
    const result = await this.repository.delete(id);
    return result;
  };
}
