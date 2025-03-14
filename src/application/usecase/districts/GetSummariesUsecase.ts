import IDistrictRepository from "../../../domain/interface/repository/IDistrictRepository";
import { District, DistrictSummary } from "../../../domain/models/districts";

export default class GetSummariesUsecase {
  private repository: IDistrictRepository;
  constructor(repository: IDistrictRepository) {
    this.repository = repository;
  }
  execute = async (regionId: string) => {
    const items: District[] = await this.repository.scan(regionId);
    const summaries: DistrictSummary[] = items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        regionId: item.regionId,
      } as DistrictSummary;
    });
    return summaries;
  };
}
