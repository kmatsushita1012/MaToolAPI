import ILocationRepository from "../../../domain/interface/repository/ILocationRepository";

export default class GetUsecase {
  constructor(private repository: ILocationRepository) {}
  execute = async (id: string, userSub: string) => {
    if (id !== userSub) {
      throw new Error();
    }
    const location = this.repository.get(id);
    return location;
  };
}
