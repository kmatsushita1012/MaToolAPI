import { LocationRepository } from "../../../inflastructure/repository/LocationRepository";

export default class GetUsecase {
  constructor(private repository: LocationRepository) {}
  execute = async (id: string, userSub: string) => {
    if (id !== userSub) {
      throw new Error();
    }
    const location = this.repository.get(id);
    return location;
  };
}
