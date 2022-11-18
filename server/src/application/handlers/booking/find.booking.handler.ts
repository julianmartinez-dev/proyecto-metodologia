import { findBookingCommands } from '../../commands/booking/find.booking.command';
import bookingRepository from '../../../infrastructure/repositories/mongodb/booking.repository';

class findBookingHandler {
  async execute(command: findBookingCommands) {
    const booking = await bookingRepository.findOneByNameAndFromDate(command.getPassenger(), command.getFromDate());
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  }
}
export default new findBookingHandler();
