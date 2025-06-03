import { SimpleDate, SimpleTime } from "../shared";

interface RouteSummary {
  id: string;
  districtId: string;
  districtName: string;
  date: SimpleDate;
  title: string;
  start: SimpleTime;
}

export default RouteSummary;
