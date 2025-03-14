import { Region } from "../../../domain/models/regions";
import IRegionRepository from "../../../domain/interface/repository/IRegionRepository";

export default class PostUsecase {
  constructor(private repository: IRegionRepository) {}
  execute = async (region: Region, userSub: string): Promise<string> => {
    if (region.id !== userSub) {
      throw new Error();
    }
    const result = await this.repository.put(region);
    return result;
  };
}
