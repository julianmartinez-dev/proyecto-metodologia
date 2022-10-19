import passengerRepository from '../../../infrastructure/repositories/passenger.repository';
import { UpdatePassengerCommand } from '../../commands/passenger/update.passenger.command';
import { validateEmail, validateFullName, validateIdentityCard } from '../../../helpers/index';

class UpdatePassengerHandler {
  async execute(command: UpdatePassengerCommand) {

    if(!validateEmail(command.getEmail())) {
      throw new Error('email is not valid');
    }
    if(!validateFullName(command.getFullName())) {
      throw new Error('fullname is not valid');
    }
    if(!validateIdentityCard(command.getIdentityCard())) {
      throw new Error('identityCard is not valid');
    }
    
    const passenger = await passengerRepository.findOneById(command.getId());

    if (!passenger) {
      throw new Error('Passenger not found');
    }
    passenger.changeEmail(command.getEmail());
    passenger.changeFullname(command.getFullName());
    passenger.changeIdentityCard(command.getIdentityCard());
    await passengerRepository.save(passenger);
  }
}

export default new UpdatePassengerHandler();
