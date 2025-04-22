import IRegionRepository from "../../../domain/interface/repository/IRegionRepository";
import { Region } from "../../../domain/models/regions";

export default class GetAllUsecase {
  constructor(private repository: IRegionRepository) {}
  execute = async () => {
    const items: Region[] = await this.repository.scan();
    return items;
  };
}
