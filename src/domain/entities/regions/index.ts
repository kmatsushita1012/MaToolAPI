import Region from "./Region";
import RegionSummary from "./RegionSummary";

export { Region, RegionSummary, toRegionSummary };
const toRegionSummary = (item: Region): RegionSummary => ({
  id: item.id,
  name: item.name,
});
