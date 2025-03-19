import { SimpleDate, SimpleTime } from "../domain/models/share";

const compareDateAndTime = (
  { dateA, timeA }: { dateA: SimpleDate; timeA: SimpleTime },
  { dateB, timeB }: { dateB: SimpleDate; timeB: SimpleTime }
) => {
  const diffOfDate = compareDate(dateA, dateB);
  if (diffOfDate === 0) {
    return diffOfDate;
  }
  return compareTime(timeA, timeB);
};

const compareDate = (dateA: SimpleDate, dateB: SimpleDate) => {
  if (dateA.year !== dateB.year) return dateA.year - dateB.year;
  if (dateA.month !== dateB.month) return dateA.month - dateB.month;
  return dateA.day - dateB.day;
};

const compareTime = (timeA: SimpleTime, timeB: SimpleTime) => {
  if (timeA.hour !== timeB.hour) return timeA.hour - timeB.hour;
  return timeA.minute - timeB.minute;
};

const calculateExpirationTime = (
  date: SimpleDate,
  time: SimpleTime,
  span: number
) => {
  const isostring = `${date.year}-${date.month}-${date.day}T${time.hour}:${
    time.minute
  }:${0}Z`;
  const fullDate = new Date(isostring);
  const expirationDate = new Date(fullDate.getTime() + span);
  return Math.floor(expirationDate.getTime() / 1000);
};

export {
  compareDate,
  compareTime,
  compareDateAndTime,
  calculateExpirationTime,
};
