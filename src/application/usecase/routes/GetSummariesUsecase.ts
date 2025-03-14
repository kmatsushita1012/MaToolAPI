import IRouteRepository from "../../../domain/interface/repository/IRouteRepository";
import { RouteSummary } from "../../../domain/models/route";

export default class GetSummariesUsecase {
  constructor(private repository: IRouteRepository) {}

  execute = async (id: string): Promise<RouteSummary[]> => {
    const items = await this.repository.query(id);
    const summaries: RouteSummary[] = items.map(
      (item) =>
        ({
          districtId: item.districtId,
          date: item.date,
          title: item.title,
        } as RouteSummary)
    );
    return summaries;
  };
}
