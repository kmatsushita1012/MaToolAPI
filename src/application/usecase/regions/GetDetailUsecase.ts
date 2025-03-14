import IRegionRepository from "../../../domain/interface/repository/IRegionRepository";
import { Region } from "../../../domain/models/regions";

export default class GetDetailUsecase {
  constructor(private repository: IRegionRepository) {}
  execute = async (id: string): Promise<Region> => {
    const item = await this.repository.get(id);
    return item;
  };
}
