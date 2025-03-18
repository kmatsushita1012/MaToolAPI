import { Coordinate } from "./share";

interface District {
  id: string;
  name: string;
  regionId: string;
  description: string | null;
  base: Coordinate | null;
  area: Coordinate[] | null;
  imagePath: string | null;
}

interface DistrictSummary {
  id: string;
  name: string;
  regionId: string;
}

const toDistrictSummary = (item: District): DistrictSummary => ({
  id: item.id,
  name: item.name,
  regionId: item.regionId,
});

export { District, DistrictSummary, toDistrictSummary };
