import { Accommodation } from '../../../domain/entities/accommodation.entity';
import accommodationRepository from '../../../infrastructure/repositories/accommodation.repository';
import { CreateAccommodationCommand } from '../../commands/accomodation/create.accommodation.command';

class CreateAccommodationHandler {
  async execute(command: CreateAccommodationCommand) {
    const accommodation = Accommodation.create(command.getName(), command.getPricePerNight());

    await accommodationRepository.save(accommodation);
  }
}

export default new CreateAccommodationHandler();
