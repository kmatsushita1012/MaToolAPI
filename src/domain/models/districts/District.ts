import { Coordinate } from "../shared";

interface District {
  id: string;
  name: string;
  regionId: string;
  description: string | null;
  base: Coordinate | null;
  area: Coordinate[];
  imagePath: string | null;
  performances: [Performance];
}

export default District;
