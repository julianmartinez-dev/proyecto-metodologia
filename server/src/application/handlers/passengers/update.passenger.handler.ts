import passengerRepository from '../../../infrastructure/repositories/mongodb/passenger.repository';
import { UpdatePassengerCommand } from '../../commands/passenger/update.passenger.command';
import { validateEmail, validateFullName, validateIdentityCard } from '../../../helpers/index';
import { Passenger } from '../../../domain/entities/passenger.entity';

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
    
    const passengerUpdated = new Passenger(
      command.getId(),
      command.getFullName(),
      command.getEmail(),
      command.getIdentityCard(),
    )

    await passengerRepository.save(passengerUpdated);
  }
}

export default new UpdatePassengerHandler();
