import { Passenger } from '../../../domain/entities/passenger.entity';
import { validateEmail, validateFullName, validateIdentityCard } from '../../../helpers';
import passengerRepository from '../../../infrastructure/repositories/mongodb/passenger.repository';
import { CreatePassengerCommand } from '../../commands/passenger/create.passenger.command';

class CreatePassengerHandler {
  async execute(command: CreatePassengerCommand) {
    const passenger = Passenger.create(command.getFullName(), command.getEmail(), command.getIdentityCard());

    //Validate user name
    if (!validateFullName(passenger.getFullName())) {
      throw new Error('Invalid full name');
    }
    //Validate email from passenger
    if (!validateEmail(passenger.getEmail())) {
      throw new Error('Invalid email');
    }

    //Validate identity card
    if (!validateIdentityCard(passenger.getIdentityCard())) {
      throw new Error('Invalid identity card');
    }
    
    if(await passengerRepository.findOneByIdentityCard(passenger.getIdentityCard())){
      throw new Error('Passenger already exists');
    }

    await passengerRepository.save(passenger);
  }
}

export default new CreatePassengerHandler();
