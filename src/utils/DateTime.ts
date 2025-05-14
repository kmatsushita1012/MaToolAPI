import { SimpleDate, SimpleTime, Span } from "../domain/entities/shared";

const compareDate = (earlier: Date, later: Date) => {
  return later.getTime() - earlier.getTime();
};

const include = (span: Span, current: Date) => {
  return compareDate(span.start, current) && compareDate(current, span.end);
};

const convertDate = (date: SimpleDate, time: SimpleTime): Date => {
  return new Date(
    date.year,
    date.month - 1,
    date.day,
    time.hour,
    time.minute,
    0,
    0
  );
};

const add = (date: Date, span: number) => {
  const expirationDate = new Date(date.getTime() + span);
  return Math.floor(expirationDate.getTime() / 1000);
};

export { compareDate, include, convertDate, add };
