import IDistrictRepository from "../../../domain/interface/repository/IDistrictRepository";
import { District } from "../../../domain/models/districts";

export default class GetDetailUsecase {
  private repository: IDistrictRepository;
  constructor(repository: IDistrictRepository) {
    this.repository = repository;
  }
  execute = async (id: string) => {
    const item = await this.repository.get(id);
    return item;
  };
}
