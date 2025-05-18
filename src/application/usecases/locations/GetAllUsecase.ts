import IDistrictRepository from "../../../domain/interface/repository/IDistrictRepository";
import ILocationRepository from "../../../domain/interface/repository/ILocationRepository";
import IRegionRepository from "../../../domain/interface/repository/IRegionRepository";
import { Location, toPublicLocation } from "../../../domain/entities/locations";
import PublicLocation from "../../../domain/entities/locations/PublicLocation";
import { include } from "../../../utils/DateTime";
import { Errors } from "../../../utils/Errors";
import { UserRole, UserRoleType } from "../../../domain/entities/shared";

export default class GetAllUsecase {
  constructor(
    private locationRepository: ILocationRepository,
    private districtRepository: IDistrictRepository,
    private regionRepository: IRegionRepository
  ) {}

  execute = async (id: string, user: UserRole): Promise<PublicLocation[]> => {
    let locations: Location[];
    if (user.type === UserRoleType.Guest || id !== user.id) {
      locations = await this.getForPublic(id);
    } else {
      locations = await this.getForAdmin(id);
    }
    if (!locations) {
      return [];
    }
    const districts = await this.districtRepository.queryByRegion(id);
    if (!districts) {
      throw Errors.NotFound();
    }
    const districtMap = new Map(districts.map((d) => [d.id, d]));

    const publicLocations = locations.flatMap((loc) => {
      const district = districtMap.get(loc.districtId);
      return district ? [toPublicLocation(loc, district)] : [];
    });

    return publicLocations;
  };

  private getForPublic = async (id: string): Promise<Location[]> => {
    const currentTime = new Date();
    let region = await this.regionRepository.get(id);
    if (!region) {
      throw Errors.NotFound();
    }
    var foundFlag = false;
    for (let span of region.spans) {
      const start = new Date(span.start * 1000);
      const end = new Date(span.end * 1000);
      if (include(start, end, currentTime)) {
        foundFlag = true;
      }
    }
    if (!foundFlag) {
      return [];
    }
    return await this.locationRepository.getAll(id);
  };
  private getForAdmin = async (id: string): Promise<Location[]> => {
    return await this.locationRepository.getAll(id);
  };
}
