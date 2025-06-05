import { Coordinate, Span } from "../shared";

export interface DistrictTool {
  districtId: string;
  districtName: string;
  regionId: string;
  regionName: string;
  performances: Performance[];
  base: Coordinate;
  spans: Span[];
}
