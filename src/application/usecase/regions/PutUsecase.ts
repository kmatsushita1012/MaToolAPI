import { Region } from "../../../domain/models/regions";
import IRegionRepository from "../../../domain/interfaces/repository/IRegionRepository";
import { Errors } from "../../../utils/Errors";

export default class PutUsecase {
  constructor(private repository: IRegionRepository) {}
  execute = async (
    regionId: string,
    item: Region,
    userSub: string
  ): Promise<string> => {
    if (regionId !== userSub || regionId !== item.id) {
      throw Errors.Unauthorized;
    }
    const result = await this.repository.put(item);
    return result;
  };
}
