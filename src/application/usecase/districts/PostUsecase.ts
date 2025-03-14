import IDistrictRepository from "../../../domain/interface/repository/IDistrictRepository";
import { District } from "../../../domain/models/districts";
import {
  forbiddenResponse,
  unauthorizedResponse,
} from "../../../utils/responses";

export default class PostUsecase {
  private repository: IDistrictRepository;
  constructor(repository: IDistrictRepository) {
    this.repository = repository;
  }
  execute = async (district: District, userSub: string) => {
    if (!userSub) {
      return unauthorizedResponse();
    }
    if (district.id !== userSub) {
      return forbiddenResponse();
    }
    const result = await this.repository.put(district);
    return result;
  };
}
