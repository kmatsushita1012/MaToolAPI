import { IRegionRepository } from "../../../domain/interface/repository";
import IDistrictRepository from "../../../domain/interface/repository/IDistrictRepository";
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
    if (!districts || districts.length === 0) {
      return [];
    }
    const items = districts.map((item) => toPublicDistrict(item, region));
    return items;
  };
}
