import IDistrictRepository from "../../../domain/interfaces/repository/IDistrictRepository";
import { District } from "../../../domain/models/districts";
import { Errors } from "../../../utils/Errors";

export default class PutUsecase {
  constructor(private repository: IDistrictRepository) {}
  execute = async (districtId: string, item: District, userSub: string) => {
    if (districtId !== userSub || districtId !== item.id) {
      return Errors.Unauthorized();
    }
    const result = await this.repository.put(item.id, item);
    return result;
  };
}
