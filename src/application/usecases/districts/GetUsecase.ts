import {
  IDistrictRepository,
  IRegionRepository,
} from "../../../domain/interface/repository";
import {
  PublicDistrict,
  toPublicDistrict,
} from "../../../domain/entities/districts";
import { Errors } from "../../../utils/Errors";

export default class GetUsecase {
  constructor(
    private districtRepository: IDistrictRepository,
    private regionRepository: IRegionRepository
  ) {}
  execute = async (id: string): Promise<PublicDistrict> => {
    const district = await this.districtRepository.get(id);
    if (!district) {
      throw Errors.NotFound();
    }
    const region = await this.regionRepository.get(district.regionId);
    if (!region) {
      throw Errors.InternalServerError();
    }
    return toPublicDistrict(district, region);
  };
}
