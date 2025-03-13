import { SimpleDate, SimpleTime } from "../domain/models/share";

export const compareDateAndTime = (
  { dateA, timeA }: { dateA: SimpleDate; timeA: SimpleTime },
  { dateB, timeB }: { dateB: SimpleDate; timeB: SimpleTime }
) => {
  const diffOfDate = compareDate(dateA, dateB);
  if (diffOfDate === 0) {
    return diffOfDate;
  }
  return compareTime(timeA, timeB);
};

export const compareDate = (dateA: SimpleDate, dateB: SimpleDate) => {
  if (dateA.year !== dateB.year) return dateA.year - dateB.year;
  if (dateA.month !== dateB.month) return dateA.month - dateB.month;
  return dateA.day - dateB.day;
};

export const compareTime = (timeA: SimpleTime, timeB: SimpleTime) => {
  if (timeA.hour !== timeB.hour) return timeA.hour - timeB.hour;
  return timeA.minute - timeB.minute;
};
