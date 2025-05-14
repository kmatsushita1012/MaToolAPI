import { Region } from "../regions";
import District from "./District";
import PublicDistrictSummary from "./DistrictSummary";
import PublicDistrict from "./PublicDistrict";

export {
  District,
  PublicDistrict,
  PublicDistrictSummary,
  toDistrictSummary,
  toPublicDistrict,
};

const toDistrictSummary = (item: District): PublicDistrictSummary => ({
  id: item.id,
  name: item.name,
  regionId: item.regionId,
});

const toPublicDistrict = (
  district: District,
  region: Region
): PublicDistrict => {
  return { ...district, regionName: region.name };
};
