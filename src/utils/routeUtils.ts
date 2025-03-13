import { SimpleDate } from "../domain/models/share";

export const makeRouteId = (date: SimpleDate, title: string) => {
  return `${date.year}${String(date.month).padStart(2, "0")}${String(
    date.day
  ).padStart(2, "0")}${title}`;
};
