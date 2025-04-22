class SimpleDate {
  year: number;
  month: number;
  day: number;

  constructor(year: number, month: number, day: number);
  constructor(year: string, month: string, day: string);

  constructor(
    year: number | string,
    month: number | string,
    day: number | string
  ) {
    this.year = Number(year);
    this.month = Number(month);
    this.day = Number(day);
  }
}

export default SimpleDate;
