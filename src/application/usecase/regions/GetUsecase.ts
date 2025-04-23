import IRegionRepository from "../../../domain/interfaces/repository/IRegionRepository";
import { Region } from "../../../domain/models/regions";
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
