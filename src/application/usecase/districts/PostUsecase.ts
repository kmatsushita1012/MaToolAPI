import IDistrictRepository from "../../../domain/interfaces/repository/IDistrictRepository";
import { District } from "../../../domain/models/districts";
import { Errors } from "../../../utils/Errors";

export default class PostUsecase {
  constructor(private repository: IDistrictRepository) {}
  execute = async (item: District, userSub: string) => {
    if (item.id !== userSub) {
      return Errors.Unauthorized();
    }
    const result = await this.repository.post(item);
    return result;
  };
}
