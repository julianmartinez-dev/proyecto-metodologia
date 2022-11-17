import { v4 } from 'uuid';
import { Passenger } from './passenger.entity';
import { Accommodation } from './accommodation.entity';

export enum BookingStatus {
  pending = 'pending',
  rejected = 'rejected',
  accepted = 'accepted',
}

export class Booking {
  private id: string = v4();
  private owner: Passenger;
  private passengers: Passenger[];
  private accommodation: Accommodation;
  private from: Date;
  private to: Date;
  private status: BookingStatus = BookingStatus.pending;

  constructor(
    id: string,
    owner: Passenger,
    passengers: Passenger[],
    accommodation: Accommodation,
    from: Date,
    to: Date,
    status: BookingStatus,
  ) {
    this.id = id;
    this.owner = owner;
    this.passengers = passengers;
    this.accommodation = accommodation;
    this.from = from;
    this.to = to;
    this.status = status;
  }

  public static create(owner: Passenger, passengers: Passenger[], accommodation: Accommodation, from: Date, to: Date) {
    //Create new booking
    return new Booking(v4(), owner, passengers, accommodation, from, to, BookingStatus.pending);
  }

  changeOwner(owner: Passenger): void {
    this.owner = owner;
  }
  changePassengers(passengers: Passenger[]): void {
    this.passengers = passengers;
  }
  changeAccomodation(accommodation: Accommodation): void {
    this.accommodation = accommodation;
  }
  changeFrom(from: Date): void {
    this.from = from;
  }
  changeTo(to: Date): void {
    this.to = to;
  }
  changeStatus(status: BookingStatus): void {
    if (status != this.status) {
      this.status = status;
    } else {
      throw new Error('Status is already ' + status);
    }
  }

  static fromPrimitives(primitives: any): Booking {
    const booking = new Booking(
      primitives.id,
      primitives.owner,
      primitives.passengers,
      primitives.accommodation,
      primitives.from,
      primitives.to,
      primitives.status,
    );

    return booking;
  }

  getId(): string {
    return this.id;
  }

  getFrom(): Date {
    return this.from;
  }

  getStatus(): BookingStatus {
    return this.status;
  }

  getOwner(): Passenger {
    return this.owner;
  }
  getPassengers(): Passenger[] {
    return this.passengers;
  }
  getAccommodation(): Accommodation {
    return this.accommodation;
  }
  getTo(): Date {
    return this.to;
  }

  toPrimitives(): any {
    return {
      id: this.id,
      owner: this.owner,
      passengers: this.passengers,
      accommodation: this.accommodation,
      from: this.from,
      to: this.to,
      status: this.status,
    };
  }

  //Calculate the total price of the booking
  finalPrice(): number {
    const diff = this.to.getTime() - this.from.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    const finalPrice = days * this.accommodation.getPricePerNight();
    return finalPrice;
  }
}
