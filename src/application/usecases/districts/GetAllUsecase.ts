import { IRegionRepository } from "../../../domain/interfaces/repository";
import IDistrictRepository from "../../../domain/interfaces/repository/IDistrictRepository";
import {
  PublicDistrict,
  toPublicDistrict,
} from "../../../domain/entities/districts";
import { Errors } from "../../../utils/Errors";

export default class GetAllUsecase {
  constructor(
    private districtRepository: IDistrictRepository,
    private regionRepository: IRegionRepository
  ) {}

  execute = async (regionId: string): Promise<PublicDistrict[]> => {
    const districts = await this.districtRepository.queryByRegion(regionId);
    const region = await this.regionRepository.get(regionId);
    if (!region) {
      throw Errors.NotFound();
    }
    const items = districts.map((item) => toPublicDistrict(item, region));
    return items;
  };
}
