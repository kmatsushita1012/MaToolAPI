import { Coordinate } from "./share";

export type District = {
  id: string;
  name: string;
  regionId: string;
  description: string | null;
  base: Coordinate;
  area: Coordinate[];
};
export type DistrictSummary = {
  id: string;
  name: string;
  regionId: string;
};
