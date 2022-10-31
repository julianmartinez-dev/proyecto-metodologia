import { v4 } from 'uuid';
import { Passenger } from './passenger.entity';
import { Accommodation } from './accommodation.entity';

export enum BookingStatus {
  pending = 'pending',
  rejected = 'rejected',
  accepted = 'accepted',
}

export class Booking {
  private id: string;
  private owner: Passenger;
  private passengers: Passenger[];
  private accommodation: Accommodation;
  private from: Date;
  private to: Date;
  private status: BookingStatus;

  constructor(
    id: string,
    owner: Passenger,
    passengers: Passenger[],
    accommodation: Accommodation,
    from: Date,
    to: Date,
    status: BookingStatus = BookingStatus.pending,
  ) {
    this.id = id;
    this.owner = owner;
    this.passengers = passengers;
    this.accommodation = accommodation;
    this.from = from;
    this.to = to;
    this.status = status;
  }

  public static create(
    owner: Passenger,
    passengers: Passenger[],
    accommodation: Accommodation,
    from: Date,
    to: Date,
    status: BookingStatus = BookingStatus.pending,
  ) {
    //Validations
    if (passengers.length < 1) {
      throw new Error('A booking must have at least one passenger');
    }
    if (from > to) {
      throw new Error('The booking must start before it ends');
    }
    const ownerInPassengers = passengers.find(passenger => passenger.getId() === owner.getId());
    if (!ownerInPassengers) {
      throw new Error('The owner must be in the passengers list');
    }

    //Create new booking
    const id = v4();
    const booking = new Booking(id, owner, passengers, accommodation, from, to, status);

    return booking;
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
    if (this.status != 'pending') {
      this.status = status;
    } else {
      throw new Error('Status is already Pending');
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
