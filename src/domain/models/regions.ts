import { SimpleDate } from "./share";

interface Region {
  id: string;
  name: string;
  description: string | null;
  prefecture: string;
  city: string;
  dates: SimpleDate[];
  imagePath: string;
}

interface RegionSummary {
  id: string;
  name: string;
}

const toRegionSummary = (item: Region): RegionSummary => ({
  id: item.id,
  name: item.name,
});

export { Region, RegionSummary, toRegionSummary };
