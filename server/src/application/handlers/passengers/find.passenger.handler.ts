import passengerRepository from '../../../infrastructure/repositories/passenger.repository';
import { UpdatePassengerCommand } from '../../commands/passenger/update.passenger.command';

class FindPassengerHandler {
  async execute(command: UpdatePassengerCommand) {
    const passenger = await passengerRepository.findOneByIdentityCard(command.getIdentityCard());

    if (!passenger) {
      throw new Error('Passenger not found');
    }
    return passenger;
  }
}

export default new FindPassengerHandler();
