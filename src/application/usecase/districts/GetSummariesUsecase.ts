import IDistrictRepository from "../../../domain/interface/repository/IDistrictRepository";
import { District, DistrictSummary } from "../../../domain/models/districts";
import { convertArray } from "../../../utils/formatter";

export default class GetSummariesUsecase {
  private repository: IDistrictRepository;
  constructor(repository: IDistrictRepository) {
    this.repository = repository;
  }
  execute = async (regionId: string) => {
    const items: District[] = await this.repository.scan(regionId);
    const summaries = convertArray<DistrictSummary>(items);
    return summaries;
  };
}
