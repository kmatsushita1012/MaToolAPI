import IDistrictRepository from "../../../domain/interface/repository/IDistrictRepository";
import ILocationRepository from "../../../domain/interface/repository/ILocationRepository";
import IRegionRepository from "../../../domain/interface/repository/IRegionRepository";
import { Location, toPublicLocation } from "../../../domain/entities/locations";
import PublicLocation from "../../../domain/entities/locations/PublicLocation";
import { include } from "../../../utils/DateTime";
import { Errors } from "../../../utils/Errors";
import { UserRole, UserRoleType } from "../../../domain/entities/shared";

export default class GetUsecase {
  constructor(
    private locationRepository: ILocationRepository,
    private districtRepository: IDistrictRepository,
    private regionRepository: IRegionRepository
  ) { }

  execute = async (
    id: string,
    user: UserRole
  ): Promise<PublicLocation | null> => {
    let location: Location | null;
    const district = await this.districtRepository.get(id);
    if (!district) {
      throw Errors.NotFound();
    }
    if ((user.type === UserRoleType.Region && user.id === district.regionId) ||
      user.type === UserRoleType.District && user.id === id
    ) {
      location = await this.getForAdmin(id);
    } else {
      location = await this.getForPublic(id);
    }
    if (!location) {
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
      const start = new Date(span.start * 1000);
      const end = new Date(span.end * 1000);
      if (include(start, end, currentTime)) {
        foundFlag = true;
        break
      }
    }
    if (!foundFlag) {
      throw Errors.Forbidden();
    }
    return await this.locationRepository.get(id);
  };
  private getForAdmin = async (id: string) => {
    return await this.locationRepository.get(id);
  };
}
