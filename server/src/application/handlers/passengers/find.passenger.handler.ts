import passengerRepository from '../../../infrastructure/repositories/passenger.repository';
import { UpdatePassengerCommand } from '../../commands/passenger/update.passenger.command';
import { FindByIdentityCardCommand } from '../../commands/passenger/findByIdentityCard.passenger.command';
import { validateIdentityCard } from '../../../helpers/index';

class FindPassengerHandler {
  async execute(command: FindByIdentityCardCommand) {

    if(!validateIdentityCard(command.getIdentityCard())){
      throw new Error('Invalid identity card');
    }
    const passenger = await passengerRepository.findOneByIdentityCard(command.getIdentityCard());

    if (!passenger) {
      throw new Error('Passenger not found');
    }
    return passenger;
  }
}

export default new FindPassengerHandler();
