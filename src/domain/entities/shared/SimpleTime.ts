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
export default SimpleTime;
