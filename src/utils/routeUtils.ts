import { SimpleDate } from "../domain/models/share";

export const makeRouteId = (date: SimpleDate, title: string) => {
  return `${date.year}${string(date.month).padStart(2, "0")}${string(
    date.day
  ).padStart(2, "0")}${title}`;
};
