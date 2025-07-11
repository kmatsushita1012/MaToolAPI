import { Coordinate, Information, Span } from "../shared";
import Performance from "./Performance";

export interface DistrictTool {
  districtId: string;
  districtName: string;
  regionId: string;
  regionName: string;
  performances: Performance[];
  milestones: Information[];
  base: Coordinate;
  spans: Span[];
}
