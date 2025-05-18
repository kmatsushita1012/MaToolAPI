import IRegionRepository from "../../../domain/interface/repository/IRegionRepository";
import { Region } from "../../../domain/entities/regions";
import { Errors } from "../../../utils/Errors";

export default class GetUsecase {
  constructor(private repository: IRegionRepository) {}
  execute = async (id: string): Promise<Region> => {
    const item = await this.repository.get(id);
    if (!item) {
      throw Errors.NotFound();
    }
    return item;
  };
}
