import passengerRepository from '../../../infrastructure/repositories/passenger.repository';
import { UpdatePassengerCommand } from '../../commands/passenger/update.passenger.command';

class UpdatePassengerHandler {
  async execute(command: UpdatePassengerCommand) {
    const passenger = await passengerRepository.findOneByIdentityCard(command.getIdentityCard());

    if (!passenger) {
      throw new Error('Passenger not found');
    }
    passenger.changeEmail(command.getEmail());
    passenger.changeFullname(command.getFullName());
    await passengerRepository.save(passenger);
  }
}

export default new UpdatePassengerHandler();
