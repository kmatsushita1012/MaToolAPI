type UUID = string;
type Coordinate = { latitude: Number; longitude: number };

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

class SimpleTime {
  hour: number;
  minute: number;

  constructor(hour: number, minute: number);
  constructor(hour: string, minute: string);

  constructor(hour: number | string, minute: number | string) {
    this.hour = Number(hour);
    this.minute = Number(minute);
  }
}

export { UUID, Coordinate, SimpleDate, SimpleTime };
