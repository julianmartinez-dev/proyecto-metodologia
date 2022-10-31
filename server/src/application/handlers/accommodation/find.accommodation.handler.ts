import accommodationRepository from '../../../infrastructure/repositories/accommodation.repository';
import { findByNameAccommodationCommand } from '../../commands/accommodation/findByName.accommodation.command';

class findAccommodationHandler {
  async execute(command: findByNameAccommodationCommand) {
    const accommodation = accommodationRepository.findOneByName(command.getName());
    if (!accommodation) {
      throw new Error('accommodation not found');
    }
    return accommodation;
  }
}
export default new findAccommodationHandler();
