import accommodationRepository from '../../../infrastructure/repositories/accommodation.repository';
import { UpdateAccommodationCommand } from '../../commands/accommodation/update.accommodation.command';

class UpdateAccommodationHandler {
  async execute(command: UpdateAccommodationCommand) {
    const accommodation = await accommodationRepository.findOneById(command.getId());

    if (!accommodation) {
      throw new Error('Accommodation not found');
    }
    accommodation.changeName(command.getName());
    accommodation.changePricePerNight(command.getPricePerNight());
    await accommodationRepository.save(accommodation);
  }
}

export default new UpdateAccommodationHandler();
