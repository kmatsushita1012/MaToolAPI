import IDistrictRepository from "../../../domain/interface/repository/IDistrictRepository";
import {
  District,
  DistrictSummary,
  toDistrictSummary,
} from "../../../domain/models/districts";

export default class GetSummariesUsecase {
  private repository: IDistrictRepository;
  constructor(repository: IDistrictRepository) {
    this.repository = repository;
  }
  execute = async (regionId: string) => {
    const items: District[] = await this.repository.scan(regionId);
    const summaries = items.map((item) => toDistrictSummary(item));
    return summaries;
  };
}
