import { SimpleDate } from "../shared";

interface RouteSummary {
  id: string;
  districtId: string;
  districtName: string;
  date: SimpleDate;
  title: string;
}

export default RouteSummary;
