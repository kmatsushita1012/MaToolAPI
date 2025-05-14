import { Span } from "../shared";

interface Region {
  id: string;
  name: string;
  description: string | null;
  prefecture: string;
  city: string;
  spans: Span[];
  imagePath: string;
}

export default Region;
