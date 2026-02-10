import { Coordinate, Information, Span } from "../shared";

interface Region {
  id: string;
  name: string;
  subname: string;
  description: string | null;
  prefecture: string;
  city: string;
  base: Coordinate;
  spans: Span[]; // removed
  milestones: Information[]; // renamed
  imagePath: string;
}

export default Region;
