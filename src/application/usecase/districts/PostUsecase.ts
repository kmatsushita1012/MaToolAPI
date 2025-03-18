import IDistrictRepository from "../../../domain/interface/repository/IDistrictRepository";
import { District } from "../../../domain/models/districts";
import { unauthorized } from "../../../utils/Errors";

export default class PostUsecase {
  private repository: IDistrictRepository;
  constructor(repository: IDistrictRepository) {
    this.repository = repository;
  }
  execute = async (item: District, userSub: string) => {
    if (item.id !== userSub) {
      return unauthorized();
    }
    const result = await this.repository.put(item);
    return result;
  };
}
