import { Booking } from '../../../domain/entities/booking.entity';
import accommodationRepository from '../../../infrastructure/repositories/accommodation.repository';
import bookingRepository from '../../../infrastructure/repositories/booking.repository';
import passengerRepository from '../../../infrastructure/repositories/passenger.repository';
import { CreateBookingCommand } from '../../commands/booking/create.booking.command';
import { CreatePassengerCommand } from '../../commands/passenger/create.passenger.command';
import createPassengerHandler from '../passengers/create.passenger.handler';

class CreateBookingHandler {
  async execute(command: CreateBookingCommand) {
    //Check if accomodation exists
    const accomodation = await accommodationRepository.findOneById(command.getAccomodation().getId());
    if (!accomodation) {
      throw new Error('Accomodation does not exist');
    }

    //Check if dates are valid
    if (command.getFrom() > command.getTo()) {
      throw new Error('The booking dates are not valid');
    }

    //Check if the owner is a passenger
    const owner = command.getOwner();
    const passengers = command.getPassengers();
    const isOwnerAPassenger = passengers.find(passenger => passenger.getId() === owner.getId());
    if (!isOwnerAPassenger) {
      throw new Error('The owner must be a passenger');
    }

    //Check if passengers already exist
    passengers.forEach(async p => {
      try {
        const passenger = await passengerRepository.findOneById(p.getId());
        if (!passenger) {
          createPassengerHandler.execute(
            new CreatePassengerCommand(p.getFullName(), p.getEmail(), p.getIdentityCard()),
          );
        }
      } catch (error) {
        throw new Error('Error adding passengers into booking');
      }
    });

    const booking = Booking.create(
      command.getOwner(),
      command.getPassengers(),
      command.getAccomodation(),
      command.getFrom(),
      command.getTo(),
      command.getStatus(),
    );

    await bookingRepository.save(booking);
  }
}

export default new CreateBookingHandler();
