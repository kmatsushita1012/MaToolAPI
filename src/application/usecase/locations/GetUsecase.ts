import IDistrictRepository from "../../../domain/interfaces/repository/IDistrictRepository";
import ILocationRepository from "../../../domain/interfaces/repository/ILocationRepository";
import IRegionRepository from "../../../domain/interfaces/repository/IRegionRepository";
import { Location, toPublicLocation } from "../../../domain/models/locations";
import PublicLocation from "../../../domain/models/locations/PublicLocation";
import { include } from "../../../utils/DateTime";
import { Errors } from "../../../utils/Errors";

export default class GetUsecase {
  constructor(
    private locationRepository: ILocationRepository,
    private districtRepository: IDistrictRepository,
    private regionRepository: IRegionRepository
  ) {}

  execute = async (
    id: string,
    userSub: string
  ): Promise<PublicLocation | null> => {
    let location: Location | null;
    if (id !== userSub) {
      location = await this.getForPublic(id);
    } else {
      location = await this.getForAdmin(id);
    }
    if (!location) {
      return null;
    }
    const district = await this.districtRepository.get(location.districtId);
    if (!district) {
      throw Errors.NotFound();
    }
    return toPublicLocation(location, district);
  };

  private getForPublic = async (id: string) => {
    const currentTime = new Date();
    let district = await this.districtRepository.get(id);
    if (!district) {
      throw Errors.NotFound();
    }
    let region = await this.regionRepository.get(district.regionId);
    if (!region) {
      throw Errors.NotFound();
    }
    var foundFlag = false;
    for (let span of region.spans) {
      if (include(span, currentTime)) {
        foundFlag = true;
      }
    }
    if (!foundFlag) {
      return null;
    }
    return await this.locationRepository.get(id);
  };
  private getForAdmin = async (id: string) => {
    return await this.locationRepository.get(id);
  };
}
