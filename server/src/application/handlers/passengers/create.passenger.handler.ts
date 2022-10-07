import { Passenger } from '../../../domain/entities/passenger.entity';
import passengerRepository from '../../../infrastructure/repositories/passenger.repository';
import { CreatePassengerCommand } from '../../commands/passenger/create.passenger.command';

class CreatePassengerHandler {
  async execute(command: CreatePassengerCommand) {
    const passenger = Passenger.create(command.getEmail(), command.getFullName(), command.getIdentityCard());

    await passengerRepository.save(passenger);
  }
}

export default new CreatePassengerHandler();
