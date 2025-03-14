import { Coordinate } from "./share";

export type District = {
  id: string;
  name: string;
  regionId: string;
  description: string | null;
  base: Coordinate | null;
  area: Coordinate[] | null;
  imagePath: string | null;
};
export type DistrictSummary = {
  id: string;
  name: string;
  regionId: string;
};
