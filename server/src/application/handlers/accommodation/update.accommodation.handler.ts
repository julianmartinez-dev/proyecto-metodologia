import accommodationRepository from '../../../infrastructure/repositories/mongodb/accomodation.repository';
import { UpdateAccommodationCommand } from '../../commands/accommodation/update.accommodation.command';
import { Accommodation } from '../../../domain/entities/accommodation.entity';

class UpdateAccommodationHandler {
  async execute(command: UpdateAccommodationCommand) {
    const accommodation = await accommodationRepository.findOneById(command.getId());

    if (!accommodation) {
      throw new Error('Accommodation not found');
    }
    const accommodationUpdated = new Accommodation(
      command.getId(),
      command.getName(),
      command.getPricePerNight()
    )
    await accommodationRepository.save(accommodationUpdated);
  }
}

export default new UpdateAccommodationHandler();
