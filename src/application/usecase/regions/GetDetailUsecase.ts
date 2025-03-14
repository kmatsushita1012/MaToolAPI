import IRegionRepository from "../../../domain/interface/repository/IRegionRepository";
import { Region } from "../../../domain/models/regions";

export default class GetDetailUsecase {
  private repository: IRegionRepository;
  constructor(repository: IRegionRepository) {
    this.repository = repository;
  }
  execute = async (id: string): Promise<Region> => {
    const item = await this.repository.get(id);
    return item;
  };
}
