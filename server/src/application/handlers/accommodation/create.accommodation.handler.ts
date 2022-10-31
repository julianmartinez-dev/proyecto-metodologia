import { Accommodation } from '../../../domain/entities/accommodation.entity';
import accommodationRepository from '../../../infrastructure/repositories/accommodation.repository';
import { CreateAccommodationCommand } from '../../commands/accommodation/create.accommodation.command';

class CreateAccommodationHandler {
  async execute(command: CreateAccommodationCommand) {
    const accommodation = Accommodation.create(command.getName(), command.getPricePerNight());

    await accommodationRepository.save(accommodation);
  }
}

export default new CreateAccommodationHandler();
