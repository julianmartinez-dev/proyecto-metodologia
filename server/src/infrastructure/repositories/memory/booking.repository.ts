import { Booking } from '../../domain/entities/booking.entity';

class Repository {
  private bookings: Booking[];
  constructor() {
    this.bookings = [];
  }

  async save(booking: Booking): Promise<void> {
    const saveBooking = this.bookings.find(a => a.getId() === booking.getId());

    if (saveBooking) {
      this.bookings.splice(this.bookings.indexOf(saveBooking), 1);
    }
    this.bookings.push(booking);
  }

  async findOneById(id: string): Promise<Booking | null> {
    const booking = this.bookings.find(a => a.getId() === id);
    return booking ? booking : null;
  }

  async findOneByNameAndFromDate(name: string, from: Date): Promise<Booking | null> {
    const booking = this.bookings.find(
      ((a: { passengers: { getName: () => string } }) => a.passengers.getName() === name) &&
        (a => a.getFrom() === from),
    );
    return booking ? booking : null;
  }
}

export default new Repository();
