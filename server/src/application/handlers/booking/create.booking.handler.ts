import { Booking } from '../../../domain/entities/booking.entity';
import accommodationRepository from '../../../infrastructure/repositories/accommodation.repository';
import bookingRepository from '../../../infrastructure/repositories/booking.repository';
import passengerRepository from '../../../infrastructure/repositories/passenger.repository';
import { CreateBookingCommand } from '../../commands/booking/create.booking.command';
import { CreatePassengerCommand } from '../../commands/passenger/create.passenger.command';
import createPassengerHandler from '../passengers/create.passenger.handler';
import { Accommodation } from '../../../domain/entities/accommodation.entity';
import { Passenger } from '../../../domain/entities/passenger.entity';

class CreateBookingHandler {
  async execute(command: CreateBookingCommand) {

    const passengers = command.getPassengers();
    let owner = command.getOwner();
    const accommodation = command.getAccomodation();
    console.log(owner)


    const ownerInPassengers = passengers.includes(owner);
    if (!ownerInPassengers) {
      console.log('passenger not found');
    } else {
      console.log('passenger found');
    }

    // const booking = Booking.create(
    //   command.getOwner(),
    //   command.getPassengers(),
    //   command.getAccomodation(),
    //   command.getFrom(),
    //   command.getTo(),
    //   command.getStatus(),
    // );

    // await bookingRepository.save(booking);
  }
}

export default new CreateBookingHandler();
