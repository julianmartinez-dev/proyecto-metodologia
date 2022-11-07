import { Accommodation } from '../../../domain/entities/accommodation.entity';
import { BookingStatus } from '../../../domain/entities/booking.entity';
import { Passenger } from '../../../domain/entities/passenger.entity';

export class CreateBookingCommand {
  // private readonly id: string;
  private readonly owner: Passenger;
  private readonly passengers: Passenger[];
  private readonly accomodation: Accommodation;
  private readonly from: Date;
  private readonly to: Date;
  private readonly status: BookingStatus;

  constructor(
    // id: string,
    owner: Passenger,
    passengers: Passenger[],
    accomodation: Accommodation,
    from: Date,
    to: Date,
    status: BookingStatus,
  ) {
    // this.id = id;
    this.owner = owner;
    this.passengers = passengers;
    this.accomodation = accomodation;
    this.from = from;
    this.to = to;
    this.status = status;
  }
  // getId(): string {
  //   return this.id;
  // }

  getOwner(): Passenger {
    return this.owner;
  }

  getPassengers(): Passenger[] {
    return this.passengers;
  }

  getAccomodation(): Accommodation {
    return this.accomodation;
  }

  getFrom(): Date {
    return this.from;
  }

  getTo(): Date {
    return this.to;
  }

  getStatus(): BookingStatus {
    return this.status;
  }
}
