import IRegionRepository from "../../../domain/interface/repository/IRegionRepository";
import { Region, RegionSummary } from "../../../domain/models/regions";

export default class GetSummariesUsecase {
  constructor(private repository: IRegionRepository) {}
  execute = async () => {
    const items: Region[] = await this.repository.scan();
    const summaries: RegionSummary[] = items.map((item) => {
      return {
        id: item.id,
        name: item.name,
      } as RegionSummary;
    });
    return summaries;
  };
}
