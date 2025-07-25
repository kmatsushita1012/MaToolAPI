import { IRegionRepository } from "../../../domain/interface/repository";
import IDistrictRepository from "../../../domain/interface/repository/IDistrictRepository";
import { DistrictTool } from "../../../domain/entities/districts";
import { Errors } from "../../../utils/Errors";
import { Information } from "../../../domain/entities/shared";

export default class GetToolsUsecase {
  constructor(
    private districtRepository: IDistrictRepository,
    private regionRepository: IRegionRepository
  ) {}

  execute = async (districtId: string): Promise<DistrictTool> => {
    const district = await this.districtRepository.get(districtId);
    if (!district) {
      throw Errors.NotFound();
    }
    const region = await this.regionRepository.get(district.regionId);
    if (!region) {
      throw Errors.NotFound();
    }
    const performances: Information[] = district.performances.map(
      (performance) => ({
        id: performance.id,
        name: performance.name,
        description: `演者 ${performance.performer} ${
          performance.description ?? ""
        }`,
      })
    );
    const item: DistrictTool = {
      districtId: districtId,
      districtName: district.name,
      regionId: district.regionId,
      regionName: region.name,
      performances: district.performances,
      milestones: region.milestones.concat(performances),
      base: district.base ?? region.base,
      spans: region.spans,
    };
    return item;
  };
}
