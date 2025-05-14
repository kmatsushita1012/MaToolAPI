import IRegionRepository from "../../../domain/interfaces/repository/IRegionRepository";
import { Region } from "../../../domain/entities/regions";

export default class GetAllUsecase {
  constructor(private repository: IRegionRepository) {}
  execute = async () => {
    const items: Region[] = await this.repository.scan();
    return items;
  };
}
