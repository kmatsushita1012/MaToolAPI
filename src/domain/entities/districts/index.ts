import { Region } from "../regions";
import District from "./District";
import DistrictForm from "./DistrictForm";
import { DistrictTool } from "./DistritctTool";
import PublicDistrict from "./PublicDistrict";
import Performance from "./Performance";

export {
  District,
  PublicDistrict,
  DistrictForm,
  DistrictTool,
  Performance,
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
  const prefix = region.id.split('_')[0]
  return `${prefix}_${name}`;
};
