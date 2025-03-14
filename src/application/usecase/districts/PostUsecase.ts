import IDistrictRepository from "../../../domain/interface/repository/IDistrictRepository";
import { District } from "../../../domain/models/districts";
import { unauthorized } from "../../../utils/error";

export default class PostUsecase {
  private repository: IDistrictRepository;
  constructor(repository: IDistrictRepository) {
    this.repository = repository;
  }
  execute = async (district: District, userSub: string) => {
    if (district.id !== userSub) {
      return unauthorized();
    }
    const result = await this.repository.put(district);
    return result;
  };
}
