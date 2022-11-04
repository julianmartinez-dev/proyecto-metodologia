import { findBookingCommands } from "../../commands/booking/find.booking.command";
import bookingRepository from "../../../infrastructure/repositories/booking.repository";

class findBookingHandler{
    async execute(command: findBookingCommands){
        const booking = bookingRepository.findOneByNameAndFromDate(command.getPassenger(), command.getFromDate())
        if (!booking) {
            throw new Error('accommodation not found');
          }
          return booking;
    }

}
export default new findBookingHandler();