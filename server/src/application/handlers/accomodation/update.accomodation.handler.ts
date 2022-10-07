import accommodationRepository from '../../../infrastructure/repositories/accommodation.repository';
import { UpdateAccomodationCommand } from '../../commands/update.accomodation.command';

class UpdateAccomodationHandler {
  async execute(command: UpdateAccomodationCommand) {
    const accommodation = await accommodationRepository.findOneById(command.getId());

    if (!accommodation) {
      throw new Error('Accommodation not found');
    }
    accommodation.changeName(command.getName());
    accommodation.changePricePerNight(command.getPricePerNight());
    await accommodationRepository.save(accommodation);
  }
}

export default new UpdateAccomodationHandler();
