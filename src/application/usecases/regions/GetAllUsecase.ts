import IRegionRepository from "../../../domain/interface/repository/IRegionRepository";
import { Region } from "../../../domain/entities/regions";

export default class GetAllUsecase {
  constructor(private repository: IRegionRepository) {}
  execute = async () => {
    const items: Region[] = await this.repository.scan();
    return items.filter((item) => {
      return item.id === "掛川祭_年番本部"
    });
  };
}
