export class findBookingCommands {
  private readonly passenger: string;
  private readonly fromDate: Date;

  constructor(passenger: string, fromDate: Date) {
    if (!passenger || !fromDate) {
      throw new Error('name  and fromDate is required');
    }
    this.passenger = passenger;
    this.fromDate = fromDate;
  }
  getPassenger(): string {
    return this.passenger;
  }
  getFromDate(): Date {
    return this.fromDate;
  }
}
