import uuidValidate from 'uuid-validate';
import { BookingStatus } from '../../../domain/entities/booking.entity';

export class UpdateBookingCommand {
  private readonly id: string;
  private readonly status: BookingStatus;

  constructor(id: string, status: BookingStatus) {
    if (!uuidValidate(id)) {
      throw new Error('id must be a valid uuid');
    }

    if (!status) {
      throw new Error('status must be specified');
    }

    this.id = id;
    this.status = status;
  }

  getId(): String {
    return this.id;
  }

  getStatus(): BookingStatus {
    return this.status;
  }
}
