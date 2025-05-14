import { Coordinate, Visibility } from "../shared";

interface District {
  id: string;
  name: string;
  regionId: string;
  description: string | null;
  base: Coordinate | null;
  area: Coordinate[];
  imagePath: string | null;
  performances: [Performance];
  visibility: Visibility;
}

export default District;
