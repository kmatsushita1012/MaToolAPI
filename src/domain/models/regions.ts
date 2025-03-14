import { SimpleDate } from "./share";

export type Region = {
  id: string;
  name: string;
  description: string | null;
  prefecture: string;
  city: string;
  dates: SimpleDate[];
  imagePath: string;
};

export type RegionSummary = {
  id: string;
  name: string;
};
