import { Region } from "../regions";
import District from "./District";
import DistrictForm from "./DistrictForm";
import { DistrictTool } from "./DistritctTool";
import PublicDistrict from "./PublicDistrict";

export {
  District,
  PublicDistrict,
  DistrictForm,
  DistrictTool,
  toPublicDistrict,
  makeDistrictId,
};

const toPublicDistrict = (
  district: District,
  region: Region
): PublicDistrict => {
  return { ...district, regionName: region.name };
};

const makeDistrictId = (name: string, region: Region): string => {
  return `${region.name}_${name}`;
};
