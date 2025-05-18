import { Region } from "../regions";
import District from "./District";
import DistrictForm from "./DistrictForm";
import PublicDistrictSummary from "./DistrictSummary";
import PublicDistrict from "./PublicDistrict";

export {
  District,
  PublicDistrict,
  PublicDistrictSummary,
  DistrictForm,
  toDistrictSummary,
  toPublicDistrict,
  makeDistrictId,
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

const makeDistrictId = (name: string, region: Region): string => {
  return `${region.name}_${name}`;
};
