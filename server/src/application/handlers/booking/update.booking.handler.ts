import bookingRepository from '../../../infrastructure/repositories/booking.repository';
import { UpdateBookingCommand } from '../../commands/booking/update.booking.command';

class UpdateBookingHandler {
  async execute(command: UpdateBookingCommand) {
    const booking = await bookingRepository.findOneById(command.getId());

    if (!booking) {
      throw new Error('Booking not found');
    }
    booking.changeStatus(command.getStatus());
    await bookingRepository.save(booking);
  }
}

export default new UpdateBookingHandler();
