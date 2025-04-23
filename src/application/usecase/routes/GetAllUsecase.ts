import IRouteRepository from "../../../domain/interfaces/repository/IRouteRepository";
import { RouteSummary, toRouteSummary } from "../../../domain/models/routes";

export default class GetAllUsecase {
  constructor(private repository: IRouteRepository) {}

  execute = async (id: string): Promise<RouteSummary[]> => {
    const items = await this.repository.query(id);
    const summaries: RouteSummary[] = items.map(toRouteSummary);
    return summaries;
  };
}
